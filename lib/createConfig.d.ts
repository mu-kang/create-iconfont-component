export declare class ConfigType {
    projectName: string;
    iconfontId: number;
    projectType: "react" | "vue";
    componentPath: string;
    componentType: "cdn" | "local";
    componentClass?: string | undefined;
    isGeneratePreview?: boolean | undefined;
}
export type ConfigSchema = ConfigType[];
declare class CreateConfig {
    config(): Promise<{
        projectName: any;
        iconfontId: any;
        projectType: any;
        componentPath: any;
        componentType: any;
        componentClass: any;
        isGeneratePreview: any;
    }> & {
        ui: import("inquirer/dist/commonjs/ui/prompt").default<{
            projectName: any;
            iconfontId: any;
            projectType: any;
            componentPath: any;
            componentType: any;
            componentClass: any;
            isGeneratePreview: any;
        }>;
    };
    create(): Promise<{
        projectName: any;
        iconfontId: any;
        projectType: any;
        componentPath: any;
        componentType: any;
        componentClass: any;
        isGeneratePreview: any;
    }>;
}
declare const _default: CreateConfig;
export default _default;
