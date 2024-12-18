"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "ConfigType",
    type: "array",
    items: {
        type: "object",
        properties: {
            projectName: {
                description: "项目名称 组件名称 英文命名",
                type: "string",
            },
            iconfontId: {
                description: "Iconfont ID",
                type: "integer",
            },
            projectType: {
                description: "项目应用框架",
                type: "string",
                enum: ["react", "vue"],
            },
            projectLanguage: {
                description: "项目语言",
                type: "string",
                enum: ["Typescript", "JavaScript"],
            },
            componentPath: {
                description: "组件生成位置",
                type: "string",
            },
            svgClass: {
                description: "  className 前缀",
                type: "string",
            },
        },
        required: [
            "projectName",
            "iconfontId",
            "projectLanguage",
            "projectType",
            "componentPath"
        ],
        additionalProperties: false,
    },
    minItems: 1,
    description: "项目配置",
};
