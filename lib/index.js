"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = exports.CreateIconfontComponentController = void 0;
const createIconfont_1 = require("./createIconfont");
const fs = require("fs-extra");
const path = require("path");
const ajv_1 = require("ajv");
const config_json_schema_1 = require("./schema/config.json.schema");
const createConfig_1 = require("./createConfig");
const signale_1 = require("signale");
const logger = new signale_1.Signale();
const ajv = new ajv_1.default();
class CreateIconfontComponentController {
    isExistIconfontJson(pwd) {
        return fs.existsSync(path.resolve(pwd, this.configFileName));
    }
    getIconfontJson(pwd) {
        return fs.readJSONSync(path.resolve(pwd, this.configFileName));
    }
    checkIconfontJson(config) {
        const validator = ajv.compile(config_json_schema_1.default);
        const result = validator(config);
        return { result, error: validator.errors };
    }
    constructor() {
        this.configFileName = "iconfont.json";
        this.init();
    }
    init() {
        if (this.isExistIconfontJson(process.cwd())) {
            logger.info("开始读取本地配置文件");
            const config = this.getIconfontJson(process.cwd());
            const checkResult = this.checkIconfontJson(config);
            if (checkResult.result) {
                createIconfont_1.default.createIconfont(config);
            }
            else {
                logger.error(checkResult.error);
                process.exit(0);
            }
        }
        else {
            logger.info("开始创建配置文件");
            createConfig_1.default.config().then((config) => {
                createIconfont_1.default.createIconfont([config]);
            });
        }
    }
}
exports.CreateIconfontComponentController = CreateIconfontComponentController;
const cli = () => new CreateIconfontComponentController();
exports.cli = cli;
