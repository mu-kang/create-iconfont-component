declare const _default: {
    $schema: string;
    title: string;
    type: string;
    items: {
        type: string;
        properties: {
            projectName: {
                description: string;
                type: string;
            };
            iconfontId: {
                description: string;
                type: string;
            };
            projectType: {
                description: string;
                type: string;
                enum: string[];
            };
            projectLanguage: {
                description: string;
                type: string;
                enum: string[];
            };
            componentPath: {
                description: string;
                type: string;
            };
            svgClass: {
                description: string;
                type: string;
            };
        };
        required: string[];
        additionalProperties: boolean;
    };
    minItems: number;
    description: string;
};
export default _default;
