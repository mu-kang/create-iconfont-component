export default {
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
				description: "项目类型",
				type: "string",
				enum: ["react", "vue"],
			},
			componentPath: {
				description: "组件生成位置",
				type: "string",
			},
			componentType: {
				description: "组件类型",
				type: "string",
				enum: ["cdn", "local"],
			},
			componentClass: {
				description: "当 componentType==='local' 时有效的组件 className 前缀",
				type: "string",
			},
			isGeneratePreview: {
				description: "是否生成预览文件",
				type: "boolean",
			},
		},
		required: [
			"projectName",
			"iconfontId",
			"projectType",
			"componentPath",
			"componentType",
		],
		additionalProperties: false,
	},
	minItems: 1,
	description: "项目配置",
};
