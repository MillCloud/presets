# presets

JavaScript / TypeScript 项目模板合集。

**[tiged](https://github.com/tiged/tiged) 不支持 gitee，如果你想要寻找更便捷的方法，不妨看看 [giget](https://github.com/unjs/giget) 和 [这里](https://www.google.com/search?q=git+clone+subdirectory&oq=git+clone+subdirectory&ie=UTF-8)。**

## 注意事项

### [Git](https://git-scm.com/)

```sh
# 不自动转换换行符
git config --global core.autocrlf false
# 不忽略文件名大小写
git config --global core.ignorecase false
# 设置默认分支名为 main
git config --global init.defaultBranch main
# 移除多余分支
git config --global remote.origin.prune true
# 推送时直接发布新分支
git config --global push.autoSetupRemote true
```

### [Node.js](https://nodejs.org/)

使用最新的 Node.js LTS（截至 2023 年 10 月 26 日为 v20）。

请自行修改 `HBuilderX` 使用的 Node.js 和 npm 路径。

### 依赖管理

```sh
npm install --location=global --force corepack
```

在项目下设置对应的包管理工具。

```sh
corepack enable
```

使用以下命令安装依赖：

```sh
pnpm install
```

运行项目需查看 `package.json` 下 `scripts`。

### 镜像

下载 Node.js 和安装依赖过慢时，可以设置 [npmmirror 镜像](https://npmmirror.com/)。克隆下来的项目已经设置了该镜像。

也可以使用 [nrm](https://github.com/Pana/nrm) 或 [cgr](https://github.com/daysai/cgr)。

```sh
# nrm
npm install --location=global nrm --registry=https://registry.npmmirror.com
nrm use taobao

# cgr
npm install --location=global cgr --registry=https://registry.npmmirror.com
cgr use taobao
```

### Terminal + Shell

Windows 下可使用 Windows Terminal + Git Bash（安装 Git 时附带），其它系统可使用自带的 Terminal + zsh + [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)。

### 其它注意点

- 请及时更新版本。
- 项目下载之后，先初始化成 Git 项目，再安装依赖。

## [Vue 3](https://vuejs.org/)

vue 模板，适用于桌面端网页和移动端网页开发。

自行增加 [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron) 并根据文档调整可以开发桌面端应用。

请使用 [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 和 [Takeover Mode](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)。

```sh
# github
npx tiged MillCloud/presets/vue your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/vue your-project-name
rm -rf presets
```

## [UniApp with Vue 3](https://uniapp.dcloud.io/)

uni-app 模板，适用于小程序和移动端应用开发。

请使用 [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 和 [Takeover Mode](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)。

```sh
# github
npx tiged MillCloud/presets/uni-app your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/uni-app your-project-name
rm -rf presets
```

## [Koa](https://koajs.com)

koa 模板，只适用于后端服务原型开发，不应用于生产环境。

```sh
# github
npx tiged MillCloud/presets/koa your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/koa your-project-name
rm -rf presets
```

## [Nest](https://nestjs.com/)

**计划内**

nest 模板，适用于后端服务开发，基于 fastify。

```sh
# github
npx tiged MillCloud/presets/nest your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/nest your-project-name
rm -rf presets
```
