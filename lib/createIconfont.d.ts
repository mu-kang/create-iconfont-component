declare class CreateIconfont {
    configFileName: string;
    iconfontOpenApiUrl: string;
    isExistIconfontJson(pwd: string): boolean;
    getIconfontJson(pwd: string): CreateIconfontComponent.ConfigSchema;
    checkIconfontJson(config: CreateIconfontComponent.ConfigSchema): boolean;
    createIconfont(config: CreateIconfontComponent.ConfigSchema): void;
    getIconfontData(configItem: CreateIconfontComponent.ConfigType): Promise<void>;
}
declare const _default: CreateIconfont;
export default _default;
