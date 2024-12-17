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
        logger.info(`开始写入${projectName}组件`);
        return fs.outputFileSync(path.resolve(process.cwd(), outFile, projectName, "index.json"), text);
    }
    createIconfont(config) {
        if (this.hasDuplicate(config, "projectName")) {
            logger.error("项目名重复");
            process.exit(0);
        }
        config.forEach((item) => {
            logger.info(`开始获取 项目名称：${item.projectName} -- iconfontId：${item.iconfontId}数据`);
            this.getIconfontData(item)
                .then((result) => {
                logger.info(`成功获取 项目名称：${item.projectName} -- iconfontId：${item.iconfontId}数据`);
                this.deleteFile(item.componentPath, item.projectName);
                this.createFile(item.componentPath, item.projectName, JSON.stringify(result, null, 2));
                logger.success(`完成写入${item.projectName}组件`);
            })
                .catch((e) => {
                logger.error(e?.message || `获取iconFont数据失败`);
            });
        });
    }
    getIconfontData(configItem) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.iconfontOpenApiUrl}?pid=${configItem.iconfontId}`)
                .then((result) => {
                const { code, data } = result.data;
                if (code !== 200) {
                    logger.error(`${configItem.iconfontId} 获取数据失败`);
                    reject(`拉取失败 项目名称：${configItem.projectName} -- iconfontId：${configItem.iconfontId}`);
                }
                else {
                    resolve(data);
                }
            })
                .catch(() => reject(`拉取失败 项目名称：${configItem.projectName} -- iconfontId：${configItem.iconfontId}`));
        });
    }
}
exports.default = new CreateIconfont();
