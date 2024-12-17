
import CreateIconfont from "./createIconfont";
import * as fs from "fs-extra";
import * as path from "path";
import Ajv, { ErrorObject } from "ajv";
// import schema from "./schema/config.json";
const schema = require("./schema/config.json");
import createConfig from "./createConfig";
import { Signale } from "signale";

const logger = new Signale();
const ajv = new Ajv();

export class CreateIconfontComponentController {
  /** 配置文件名称 */
  configFileName: string = "iconfont.json";

  /** 获取当前目录是否存在 iconfont.json */
  isExistIconfontJson(pwd: string): boolean {
    return fs.existsSync(path.resolve(pwd, this.configFileName));
  }
  /** 获取当前目录的 iconfont.json 内容 */
  getIconfontJson(pwd: string): CreateIconfontComponent.ConfigSchema {
    return fs.readJSONSync(path.resolve(pwd, this.configFileName));
  }

  /** 校验 Iconfont.json 是否规范 */
  checkIconfontJson(config: CreateIconfontComponent.ConfigSchema): {
    result: boolean;
    error:
      | ErrorObject<string, Record<string, any>, unknown>[]
      | null
      | undefined;
  } {
    const validator = ajv.compile(schema);
    const result = validator(config);
    return { result, error: validator.errors };
  }
  constructor() {
    this.init();
  }
  init() {
    if (this.isExistIconfontJson(process.cwd())) {
      const config = this.getIconfontJson(process.cwd());
      const checkResult = this.checkIconfontJson(config);
      if (checkResult.result) {
        CreateIconfont.createIconfont(config);
      } else {
        logger.error(checkResult.error);
        process.exit(0);
      }
    } else {
      logger.info("开始创建配置文件");
      createConfig.config().then((config) => {
        console.log(config);
        CreateIconfont.createIconfont([config]);
      });
    }
  }
}

export const cli = () => new CreateIconfontComponentController();