"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const ajv_1 = __importDefault(require("ajv"));
const config_json_1 = __importDefault(require("./schema/config.json"));
const axios_1 = __importDefault(require("axios"));
const ajv = new ajv_1.default();
class CreateIconfont {
    constructor() {
        this.configFileName = "iconfont.json";
        this.iconfontOpenApiUrl = "https://www.iconfont.cn/open/project/detail.json";
    }
    isExistIconfontJson(pwd) {
        return fs_extra_1.default.existsSync(path_1.default.resolve(pwd, this.configFileName));
    }
    getIconfontJson(pwd) {
        return fs_extra_1.default.readJSONSync(path_1.default.resolve(pwd, this.configFileName));
    }
    checkIconfontJson(config) {
        const validator = ajv.compile(config_json_1.default);
        const validationResult = validator(config);
        if (validationResult) {
            return true;
        }
        else {
            return false;
        }
    }
    createIconfont(config) {
        config.forEach((item) => __awaiter(this, void 0, void 0, function* () {
            yield this.getIconfontData(item);
        }));
    }
    getIconfontData(configItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield axios_1.default.get(`${this.iconfontOpenApiUrl}?pid=${configItem.iconfontId}`);
                const data = result.data.data;
                console.log(`data`);
            }
            catch (error) {
            }
        });
    }
}
exports.default = new CreateIconfont();
