import { ConfigSchema, ConfigType } from "./createConfig";
declare class CreateIconfont {
    iconfontOpenApiUrl: string;
    hasDuplicate(config: ConfigSchema, key: keyof ConfigType): boolean;
    deleteFile(outFile: string, projectName: string): void;
    createFile(outFile: string, projectName: string, text: string): void;
    createIconfont(config: ConfigSchema): void;
    getIconfontData(configItem: ConfigType): Promise<unknown>;
}
declare const _default: CreateIconfont;
export default _default;
