import { ErrorObject } from "ajv";
export declare class CreateIconfontComponentController {
    configFileName: string;
    isExistIconfontJson(pwd: string): boolean;
    getIconfontJson(pwd: string): CreateIconfontComponent.ConfigSchema;
    checkIconfontJson(config: CreateIconfontComponent.ConfigSchema): {
        result: boolean;
        error: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
    };
    constructor();
    init(): void;
}
export declare const cli: () => CreateIconfontComponentController;
