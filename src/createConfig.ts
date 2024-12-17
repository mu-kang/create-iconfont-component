import inquirer from "inquirer";
import { Signale } from "signale";

const logger = new Signale(); 
export class ConfigType {
  /** 项目名称 组件名称 英文命名 */
  projectName!: string;
  /** Iconfont ID */
  iconfontId!: number;
  /** 项目类型 */
  projectType!: "react" | "vue";
  /** 组件生成位置 */
  componentPath!: string;
  /** 组件类型 */
  componentType!: "cdn" | "local";
  /**  
   **  组件 className 前缀
   **  componentType==='local'  时有效
   * */
  componentClass?: string | undefined;
  /** 是否生成预览文件 */
  isGeneratePreview?: boolean | undefined;
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
        message: "请选择项目类型",
        name: "projectType",
        choices: [
          { name: "React", value: "react" },
          { name: "Vue", value: "vue" },
        ],
      },
      {
        type: "input",
        message: "请输入组件生成位置",
        name: "componentPath",
        default: "./src/components",
      },
      {
        type: "list",
        message: "请选择组件生成类型",
        name: "componentType",
        choices: [
          { name: "本地生成svg", value: "local" },
          { name: "阿里cdn", value: "cdn" },
        ],
      },
      {
        type: "input",
        message: "请输入svg className前缀",
        name: "componentClass",
        when: function (answers) {
          return answers.componentType === "local";
        },
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