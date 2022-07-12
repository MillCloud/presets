# presets

JavaScript / TypeScript 项目模板合集。

**[degit](https://github.com/Rich-Harris/degit) 不支持 gitee，如果你想要寻找更便捷的方法，不妨看看 [这里](https://www.google.com/search?q=git+clone+subdirectory&oq=git+clone+subdirectory&ie=UTF-8)。**

## 注意事项

### [Git](https://git-scm.com/)

```sh
# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main
```

### [Node.js](https://nodejs.org/)

使用最新的 Node.js LTS。

- 2022-10-25: v18
- 2021-10-26: v16

### 依赖管理

```sh
npm uninstall --location=global corepack
npm install --location=global npm yarn pnpm
```

所有 `uni-app` 相关项目使用以下命令安装依赖：

```sh
npm install
```

其它项目使用以下命令安装依赖：

```sh
pnpm install
```

### 镜像

下载 Node.js 和安装依赖过慢时，可以设置 [npmmirror 镜像](https://npmmirror.com/)。

也可以使用 [nrm](https://github.com/Pana/nrm) 或 [cgr](https://github.com/daysai/cgr)。

```sh
npm install --location=global nrm --registry=https://registry.npmmirror.com
nrm use taobao

npm install --location=global cgr --registry=https://registry.npmmirror.com
cgr use taobao
```

### Terminal + Shell

Windows 下可使用 Windows Terminal + Git Bash（安装 Git 时附带），其它系统可使用自带的 Terminal + zsh + [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)。

### 其它注意点

- 请及时更新版本。
- 如果不是直接安装 Node.js，可能需要 [额外配置 husky](https://typicode.github.io/husky/#/?id=troubleshoot)。
- 项目下载之后，先初始化成 Git 项目，再安装依赖。

## [Vue 3](https://vuejs.org/)

请使用 [Volar](https://github.com/johnsoncodehk/volar) 和 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471)。

```sh
# github
npx degit MillCloud/presets/vue your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/vue your-project-name
rm -rf presets
```

## [UniApp with Vue 3](https://uniapp.dcloud.io/)

请使用 [Volar](https://github.com/johnsoncodehk/volar) 和 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471)。

```sh
# github
degit MillCloud/presets/uni-app your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/uni-app your-project-name
rm -rf presets
```

## [Taro with Vue 3](https://docs.taro.zone/)

请使用 [Volar](https://github.com/johnsoncodehk/volar) 和 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471)。

**WIP**

```sh
# github
degit MillCloud/presets/taro-vue your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/taro-vue your-project-name
rm -rf presets
```

## [Nuxt 3](https://v3.nuxtjs.org/)

请使用 [Volar](https://github.com/johnsoncodehk/volar) 和 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471)。

**WIP**

```sh
# github
degit MillCloud/presets/nuxt your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/nuxt your-project-name
rm -rf presets
```

## [React](https://reactjs.org/)

**WIP**

```sh
# github
degit MillCloud/presets/react your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/react your-project-name
rm -rf presets
```

## [Taro with React](https://docs.taro.zone/)

**WIP**

```sh
# github
degit MillCloud/presets/taro your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/taro your-project-name
rm -rf presets
```

## [Umi](https://umijs.org/zh-CN)

**WIP**

```sh
# github
degit MillCloud/presets/umi your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/umi your-project-name
rm -rf presets
```

## [Alita](https://alitajs.com/)

**WIP**

```sh
# github
degit MillCloud/presets/alita your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/alita your-project-name
rm -rf presets
```

## [Expo](https://expo.io/)

**WIP**

```sh
# github
degit MillCloud/presets/expo your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/expo your-project-name
rm -rf presets
```

## [Next](https://nextjs.org/)

**WIP**

```sh
# github
degit MillCloud/presets/next your-project-name

# gitee
git clone --depth 1 git@gitee.com:MillCloud/presets
cp presets/next your-project-name
rm -rf presets
```
