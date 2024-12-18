# create-iconfont-component

本项目是根据 [Iconfont](https://www.iconfont.cn) 上的图标在项目中生成 `React` 或者 `Vue` 组件，方便大家使用。

## 使用方式一(推荐)：

1. 在项目根目录新增 `iconfont.json` 文件

```json
[
  {
    // 项目名称
    "projectName": "project", 
    // iconfont 项目id 
    "iconfontId": 000, 
    // 项目使用框架 react | vue
    "projectType": "react",
    // 组件生成位置 相对位置
    "componentPath": "./dist",
    // 项目使用的 语言 Typescript | JavaScript
    "projectLanguage": "Typescript",
    // 是否给 svg 添加 class
    "svgClass": "demo"
  }
]
```
2. 安装 `create-iconfont-component`

```bash
npm install -D create-iconfont-component
```

3. 在项目 `package.json` 中新增

```json
 "scripts": {
    ...
    "iconfont": "create-iconfont-component"
  },
```

## 使用方式二：
1. 执行以下命令

```bash
npx create-iconfont-component
```
2. 按照提示填写信息

```text
✔ 请输入项目名称 projecta
✔ 请输入Iconfont项目Id 0
✔ 请选择项目应用框架 React
✔ 项目开发语言 Typescript
✔ 请输入组件生成位置 ./dist
✔ 请输入svg className前缀
✔ 是否生成预览文件 是
```