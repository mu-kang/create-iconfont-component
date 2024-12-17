import * as fs from "fs-extra";
import * as path from "path";
import Axios from "axios";
import { Signale } from "signale";

const logger = new Signale();

class CreateIconfont {
  /** iconfont openAPI url  */
  iconfontOpenApiUrl: string =
    "http://www.iconfont.cn/open/project/detail.json";
  /** 判断config中是否有重复的项目名字 */
  hasDuplicate(
    config: CreateIconfontComponent.ConfigSchema,
    key: keyof CreateIconfontComponent.ConfigType
  ) {
    return config.some(
      (item, index) => config.findIndex((i) => i[key] === item[key]) !== index
    );
  }
  /** 删除文件 */
  deleteFile(outFile: string, projectName: string) {
    return fs.removeSync(path.resolve(process.cwd(), outFile, projectName));
  }
  /**  生成文件 */
  createFile(outFile: string, projectName: string, text: string) {
    return fs.outputFileSync(
      path.resolve(process.cwd(), outFile, projectName, "index.json"),
      text
    );
  }
  /** 生成 iconfont.json */
  createIconfont(config: CreateIconfontComponent.ConfigSchema) {
    if (this.hasDuplicate(config, "projectName")) {
      logger.error("项目名重复");
      process.exit(0);
    }
    config.forEach(async (item) => {
      const result = await this.getIconfontData(item);
      this.deleteFile(item.componentPath, item.projectName);
      this.createFile(
        item.componentPath,
        item.projectName,
        JSON.stringify(result, null, 2)
      );
    });
    logger.success(`执行完成`);
    process.exit(0);
  }

  /** 获取 Iconfont openApi 数据 */
  async getIconfontData(configItem: CreateIconfontComponent.ConfigType) {
    try {
      const result = await Axios.get(
        `${this.iconfontOpenApiUrl}?pid=${configItem.iconfontId}`
      );
      const { code, data } = result.data;
      if (code !== 200) {
        logger.error(`${configItem.iconfontId} 获取数据失败`);
        return;
      }
      return data
      // console.log(`data`, data);
    } catch (error: any) {
      logger.error(error.message);
    }
  }
}

export default new CreateIconfont();