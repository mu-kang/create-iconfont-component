"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigType = void 0;
const inquirer_1 = require("inquirer");
const signale_1 = require("signale");
const logger = new signale_1.Signale();
class ConfigType {
}
exports.ConfigType = ConfigType;
class CreateConfig {
    config() {
        return inquirer_1.default.prompt([
            {
                type: "input",
                message: "请输入项目名称",
                name: "projectName",
                required: true,
                validate: function (value) {
                    if (!/^[a-zA-Z]+$/.test(value)) {
                        return "请输入项目名称 a-zA-Z";
                    }
                    return true;
                },
            },
            {
                type: "input",
                message: "请输入Iconfont项目Id",
                name: "iconfontId",
                required: true,
                validate: function (value) {
                    if (!/^\d+$|^-?\d+$/.test(value)) {
                        return "请输入数字";
                    }
                    return true;
                },
            },
            {
                type: "list",
                message: "请选择项目应用框架",
                name: "projectType",
                choices: [
                    { name: "React", value: "react" },
                    { name: "Vue", value: "vue" },
                ],
            },
            {
                type: "list",
                message: "项目开发语言",
                name: "projectLanguage",
                choices: [
                    { name: "Typescript", value: "Typescript" },
                    { name: "JavaScript", value: "JavaScript" },
                ],
            },
            {
                type: "input",
                message: "请输入组件生成位置",
                name: "componentPath",
                default: "./src/components",
            },
            {
                type: "input",
                message: "请输入svg className前缀",
                name: "svgClass"
            },
            {
                type: "list",
                message: "是否生成预览文件",
                name: "isGeneratePreview",
                choices: [
                    { name: "是", value: true },
                    { name: "否", value: false },
                ],
            },
        ]);
    }
    async create() {
        try {
            const config = await this.config();
            return config;
        }
        catch (error) {
            logger.error(`异常终止 ${error.message || ""}`);
            process.exit(0);
        }
    }
}
exports.default = new CreateConfig();
