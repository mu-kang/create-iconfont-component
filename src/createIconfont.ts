import * as fs from "fs-extra";
import * as path from "path";
import Axios from "axios";
import { Signale } from "signale";
import { ConfigSchema, ConfigType } from "./createConfig";
import * as ejs from "ejs";

const logger = new Signale();
enum FileExt {
  Typescript_react = "tsx",
  Typescript_vue = "vue",
  JavaScript_react = "js",
  JavaScript_vue = "vue",
}
function toPascalCase(str: string): string {
  return (
    "Icon" +
    str
      .replace(/[-_]/g, " ") // 将 '-' 或 '_' 替换为空格
      .split(" ") // 使用空格分割成数组
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // 首字母大写其余小写
      .join("") // 连接数组元素，形成最终字符串
      .replace(/\s+/g, "")
  ); // 去除所有空白字符
}
class CreateIconfont {
  /** iconfont openAPI url  */
  iconfontOpenApiUrl: string =
    "http://www.iconfont.cn/open/project/detail.json";
  /** 判断config中是否有重复的项目名字 */
  hasDuplicate(config: ConfigSchema, key: keyof ConfigType) {
    return config.some(
      (item, index) => config.findIndex((i) => i[key] === item[key]) !== index
    );
  }
  /** 删除文件 */
  deleteFile(outFile: string, projectName: string) {
    return fs.removeSync(path.resolve(process.cwd(), outFile, projectName));
  }
  /**  生成文件 */
  createFile(config: ConfigType, data: any[]) {
    const {
      projectName,
      componentPath: outFile,
      svgClass,
      projectType,
			projectLanguage
    } = config;

    // outFile: string, projectName: string
    logger.info(`开始写入${projectName}组件`);
    const ejsTemplate = fs.readFileSync(
      path.resolve(__dirname, `../template/${projectLanguage}/${projectType}/index.ejs`),
      "utf-8"
    );
    ejs
      .render(
        ejsTemplate,
        { icons: data?.map((item) => toPascalCase(item.font_class)) },
        { async: true }
      )
      .then((text: string) => {
        return fs.outputFileSync(
          path.resolve(
            process.cwd(),
            outFile,
            projectName,
            `index.${FileExt[`${projectLanguage}_${projectType}`]}`
          ),
          text
        );
      });
    data.forEach((item) => {
      const ejsTemplate = fs.readFileSync(
        path.resolve(__dirname, `../template/${projectLanguage}/${projectType}/icon.ejs`),
        "utf-8"
      );

      ejs
        .render(
          ejsTemplate,
          { name: toPascalCase(item.font_class), svgPath: item.svg  ,svgClass},
          { async: true }
        )
        .then((text: string) => {
          return fs.outputFileSync(
            path.resolve(
              process.cwd(),
              outFile,
              projectName,
              `${toPascalCase(item.font_class)}.${FileExt[`${projectLanguage}_${projectType}`]}`
            ),
            text
          );
        });
      // return fs.outputFileSync(
      //   path.resolve(process.cwd(), outFile, projectName, "index.json"),
      //   text
      // );
    });
  }
  /** 生成 iconfont.json */
  createIconfont(config: ConfigSchema) {
    if (this.hasDuplicate(config, "projectName")) {
      logger.error("项目名重复");
      process.exit(0);
    }
    config.forEach((item) => {
      logger.info(
        `开始获取 项目名称：${item.projectName} -- iconfontId：${item.iconfontId}数据`
      );

      this.getIconfontData(item)
        .then((result: any) => {
          logger.info(
            `成功获取 项目名称：${item.projectName} -- iconfontId：${item.iconfontId}数据`
          );

          this.deleteFile(item.componentPath, item.projectName);
          this.createFile(item, result.icons || []);
          logger.success(`完成写入${item.projectName}组件`);
        })
        .catch((e) => {
          logger.error(e?.message || `获取iconFont数据失败`);
        });
    });
    // logger.success(`执行完成`);
    // process.exit(0);
  }

  /** 获取 Iconfont openApi 数据 */
  getIconfontData(configItem: ConfigType) {
    return new Promise((resolve, reject) => {
      Axios.get(`${this.iconfontOpenApiUrl}?pid=${configItem.iconfontId}`)
        .then((result) => {
          const { code, data } = result.data;
          if (code !== 200) {
            logger.error(`${configItem.iconfontId} 获取数据失败`);
            reject(
              `拉取失败 项目名称：${configItem.projectName} -- iconfontId：${configItem.iconfontId}`
            );
          } else {
            resolve(data);
          }
        })
        .catch(() =>
          reject(
            `拉取失败 项目名称：${configItem.projectName} -- iconfontId：${configItem.iconfontId}`
          )
        );
    });
  }
}

export default new CreateIconfont();
