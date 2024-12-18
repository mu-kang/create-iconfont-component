import inquirer from "inquirer";
import { Signale } from "signale";

const logger = new Signale(); 
export class ConfigType {
  /** 项目名称 组件名称 英文命名 */
  projectName!: string;
  /** Iconfont ID */
  iconfontId!: number;
  /** 项目应用框架 */
  projectType!: "react" | "vue";
  /** 项目开发语言 */
  projectLanguage!: "Typescript" | "JavaScript";
  /** 组件生成位置 */
  componentPath!: string;
  /**   svg标签className   */
  svgClass?: string | undefined;
  
}
export type ConfigSchema = ConfigType[];


class CreateConfig {
  config() {
    return inquirer.prompt([
      {
        type: "input",
        message: "请输入项目名称",
        name: "projectName",
        required: true,
        validate: function (value) {
          if (!/^[a-zA-Z]+$/.test(value)) {
            return "请输入项目名称 a-zA-Z";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "请输入Iconfont项目Id",
        name: "iconfontId",
        required: true,
        validate: function (value) {
          if (!/^\d+$|^-?\d+$/.test(value)) {
            return "请输入数字";
          }
          return true;
        },
      },

      {
        type: "list",
        message: "请选择项目应用框架",
        name: "projectType",
        choices: [
          { name: "React", value: "react" },
          { name: "Vue", value: "vue" },
        ],
      },
      {
        type: "list",
        message: "项目开发语言",
        name: "projectLanguage",
        choices: [
          { name: "Typescript", value: "Typescript" },
          { name: "JavaScript", value: "JavaScript" },
        ],
      },
      {
        type: "input",
        message: "请输入组件生成位置",
        name: "componentPath",
        default: "./src/components",
      },
       
      {
        type: "input",
        message: "请输入svg className前缀",
        name: "svgClass"
      },
      {
        type: "list",
        message: "是否生成预览文件",
        name: "isGeneratePreview",
        choices: [
          { name: "是", value: true },
          { name: "否", value: false },
        ],
      },
    ]);
  }
  async create() {
    try {
      const config = await this.config();
      return config;
    } catch (error: any) {
      logger.error(`异常终止 ${error.message || ""}`);
      process.exit(0);
    }
  }
}

export default new CreateConfig();