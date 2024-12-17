import * as fs from "fs-extra";
import * as path from "path";
import Axios from "axios";
import { Signale } from "signale";
import { ConfigSchema, ConfigType } from "./createConfig";

const logger = new Signale();

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
	createFile(outFile: string, projectName: string, text: string) {
    logger.info(
      `开始写入${projectName}组件`
    );
		return fs.outputFileSync(
			path.resolve(process.cwd(), outFile, projectName, "index.json"),
			text
		);
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
				.then((result) => {
          logger.info(
            `成功获取 项目名称：${item.projectName} -- iconfontId：${item.iconfontId}数据`
          );
    
					this.deleteFile(item.componentPath, item.projectName);
					this.createFile(
						item.componentPath,
						item.projectName,
						JSON.stringify(result, null, 2)
					);
          logger.success(
            `完成写入${item.projectName}组件`
          );
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
