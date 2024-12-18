"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const axios_1 = require("axios");
const signale_1 = require("signale");
const ejs = require("ejs");
const logger = new signale_1.Signale();
var FileExt;
(function (FileExt) {
    FileExt["Typescript_react"] = "tsx";
    FileExt["Typescript_vue"] = "vue";
    FileExt["JavaScript_react"] = "js";
    FileExt["JavaScript_vue"] = "vue";
})(FileExt || (FileExt = {}));
function toPascalCase(str) {
    return ("Icon" +
        str
            .replace(/[-_]/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("")
            .replace(/\s+/g, ""));
}
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
    createFile(config, data) {
        const { projectName, componentPath: outFile, svgClass, projectType, projectLanguage } = config;
        logger.info(`开始写入${projectName}组件`);
        const ejsTemplate = fs.readFileSync(path.resolve(__dirname, `../template/${projectLanguage}/${projectType}/index.ejs`), "utf-8");
        ejs
            .render(ejsTemplate, { icons: data?.map((item) => toPascalCase(item.font_class)) }, { async: true })
            .then((text) => {
            return fs.outputFileSync(path.resolve(process.cwd(), outFile, projectName, `index.${FileExt[`${projectLanguage}_${projectType}`]}`), text);
        });
        data.forEach((item) => {
            const ejsTemplate = fs.readFileSync(path.resolve(__dirname, `../template/${projectLanguage}/${projectType}/icon.ejs`), "utf-8");
            ejs
                .render(ejsTemplate, { name: toPascalCase(item.font_class), svgPath: item.svg, svgClass }, { async: true })
                .then((text) => {
                return fs.outputFileSync(path.resolve(process.cwd(), outFile, projectName, `${toPascalCase(item.font_class)}.${FileExt[`${projectLanguage}_${projectType}`]}`), text);
            });
        });
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
                this.createFile(item, result.icons || []);
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
