"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const axios_1 = require("axios");
const signale_1 = require("signale");
const logger = new signale_1.Signale();
class CreateIconfont {
    constructor() {
        this.iconfontOpenApiUrl = "http://www.iconfont.cn/open/project/detail.json";
    }
    hasDuplicate(config, key) {
        return config.some((item, index) => config.findIndex((i) => i[key] === item[key]) !== index);
    }
    deleteFile(outFile, projectName) {
        return fs.removeSync(path.resolve(process.cwd(), outFile, projectName));
    }
    createFile(outFile, projectName, text) {
        return fs.outputFileSync(path.resolve(process.cwd(), outFile, projectName, "index.json"), text);
    }
    createIconfont(config) {
        if (this.hasDuplicate(config, "projectName")) {
            logger.error("项目名重复");
            process.exit(0);
        }
        config.forEach(async (item) => {
            const result = await this.getIconfontData(item);
            this.deleteFile(item.componentPath, item.projectName);
            this.createFile(item.componentPath, item.projectName, JSON.stringify(result, null, 2));
        });
        logger.success(`执行完成`);
        process.exit(0);
    }
    async getIconfontData(configItem) {
        try {
            const result = await axios_1.default.get(`${this.iconfontOpenApiUrl}?pid=${configItem.iconfontId}`);
            const { code, data } = result.data;
            if (code !== 200) {
                logger.error(`${configItem.iconfontId} 获取数据失败`);
                return;
            }
            return data;
        }
        catch (error) {
            logger.error(error.message);
        }
    }
}
exports.default = new CreateIconfont();
