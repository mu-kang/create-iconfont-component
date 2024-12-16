import CreateIconfont from "./createIconfont";

if (CreateIconfont.isExistIconfontJson(process.cwd())) {
	const config = CreateIconfont.getIconfontJson(process.cwd());
	if (CreateIconfont.checkIconfontJson(config)) {
		console.log("iconfont.json 规范");
		CreateIconfont.createIconfont(config);
	}
} else {
	console.log("不存在 iconfont.json");
}
console.log(process.cwd());
