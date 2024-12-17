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
            componentPath: {
                description: string;
                type: string;
            };
            componentType: {
                description: string;
                type: string;
                enum: string[];
            };
            componentClass: {
                description: string;
                type: string;
            };
            isGeneratePreview: {
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
