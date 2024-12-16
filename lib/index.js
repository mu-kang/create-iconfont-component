"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createIconfont_1 = __importDefault(require("./createIconfont"));
if (createIconfont_1.default.isExistIconfontJson(process.cwd())) {
    const config = createIconfont_1.default.getIconfontJson(process.cwd());
    if (createIconfont_1.default.checkIconfontJson(config)) {
        console.log("iconfont.json 规范");
        createIconfont_1.default.createIconfont(config);
    }
}
else {
    console.log("不存在 iconfont.json");
}
console.log(process.cwd());
