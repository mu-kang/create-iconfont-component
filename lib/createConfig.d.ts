export declare class ConfigType {
    projectName: string;
    iconfontId: number;
    projectType: "react" | "vue";
    projectLanguage: "Typescript" | "JavaScript";
    componentPath: string;
    svgClass?: string | undefined;
}
export type ConfigSchema = ConfigType[];
declare class CreateConfig {
    config(): Promise<{
        projectName: any;
        iconfontId: any;
        projectType: any;
        projectLanguage: any;
        componentPath: any;
        svgClass: any;
        isGeneratePreview: any;
    }> & {
        ui: import("inquirer/dist/commonjs/ui/prompt").default<{
            projectName: any;
            iconfontId: any;
            projectType: any;
            projectLanguage: any;
            componentPath: any;
            svgClass: any;
            isGeneratePreview: any;
        }>;
    };
    create(): Promise<{
        projectName: any;
        iconfontId: any;
        projectType: any;
        projectLanguage: any;
        componentPath: any;
        svgClass: any;
        isGeneratePreview: any;
    }>;
}
declare const _default: CreateConfig;
export default _default;
