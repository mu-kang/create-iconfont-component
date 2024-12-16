import fs from "fs-extra";
import path from "path";
import Ajv from "ajv";
import schema from "./schema/config.json";
import Axios from "axios";

const ajv = new Ajv();

class CreateIconfont {
  /** 配置文件名称 */
  configFileName: string = "iconfont.json";
  /** iconfont openAPI url  */
  iconfontOpenApiUrl: string =
    "https://www.iconfont.cn/open/project/detail.json";
  /** 获取当前目录是否存在 iconfont.json */
  isExistIconfontJson(pwd: string): boolean {
    return fs.existsSync(path.resolve(pwd, this.configFileName));
  }
  /** 获取当前目录的 iconfont.json */
  getIconfontJson(pwd: string): CreateIconfontComponent.ConfigSchema {
    return fs.readJSONSync(path.resolve(pwd, this.configFileName));
  }
  /** 校验 Iconfont.json 是否规范 */
  checkIconfontJson(config: CreateIconfontComponent.ConfigSchema): boolean {
    const validator = ajv.compile(schema);
    const validationResult = validator(config);

    if (validationResult) {
      return true;
    } else {
      return false;
    }
  }

  /** 生成 iconfont.json */
  createIconfont(config: CreateIconfontComponent.ConfigSchema) {
    config.forEach(async (item) => {
      await this.getIconfontData(item);
    });
  }

  /** 获取 Iconfont openApi 数据 */

  async getIconfontData(configItem: CreateIconfontComponent.ConfigType) {
    try {
      const result = await Axios.get(
        `${this.iconfontOpenApiUrl}?pid=${configItem.iconfontId}`
      );
      const data = result.data.data;
      console.log(`data`);
    } catch (error) {
      // console.log(error);
    }
  }
}

export default new CreateIconfont();