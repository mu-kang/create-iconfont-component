declare namespace CreateIconfontComponent {
  class ConfigType {
    /** 项目名称 组件名称 英文命名 */
    projectName: string;
    /** Iconfont ID */
    iconfontId: number;
    /** 项目类型 */
    projectType: "react" | "vue";
    /** 组件生成位置 */
    componentPath: string;
    /** 组件类型 */
    componentType: "cdn" | "local";
    /**  
     **  组件 className 前缀
     **  componentType==='local'  时有效
     * */
    componentClass?: string | undefined;
    /** 是否生成预览文件 */
    isGeneratePreview?: boolean | undefined;
  }
  type ConfigSchema = ConfigType[];
}