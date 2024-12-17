import { ErrorObject } from "ajv";
import { ConfigSchema } from "./createConfig";
export declare class CreateIconfontComponentController {
    configFileName: string;
    isExistIconfontJson(pwd: string): boolean;
    getIconfontJson(pwd: string): ConfigSchema;
    checkIconfontJson(config: ConfigSchema): {
        result: boolean;
        error: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
    };
    constructor();
    init(): void;
}
export declare const cli: () => CreateIconfontComponentController;
