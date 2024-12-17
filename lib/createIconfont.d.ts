declare class CreateIconfont {
    iconfontOpenApiUrl: string;
    hasDuplicate(config: CreateIconfontComponent.ConfigSchema, key: keyof CreateIconfontComponent.ConfigType): boolean;
    deleteFile(outFile: string, projectName: string): void;
    createFile(outFile: string, projectName: string, text: string): void;
    createIconfont(config: CreateIconfontComponent.ConfigSchema): void;
    getIconfontData(configItem: CreateIconfontComponent.ConfigType): Promise<any>;
}
declare const _default: CreateIconfont;
export default _default;
