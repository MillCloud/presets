# koa

koa 模板，只适用于后端服务原型开发。

## 特性

### 日志

基于 [pino](https://github.com/pinojs/pino)、[pino-pretty](https://github.com/pinojs/pino-pretty)、[koa-pino-logger](https://github.com/pinojs/koa-pino-logger)。

提供简易清晰的日志输出，不保存本地文件。

### ssl

基于 [koa-sslify](https://github.com/turboMaCk/koa-sslify)。

默认不开启，需手动在 [app.ts](./src/app.ts) 打开注释。

### cors

基于 [@koa/cors](https://github.com/koajs/cors)。

提供跨域支持。

### 静态文件

基于 [koa-mount](https://github.com/koajs/mount) 和 [koa-static](https://github.com/koajs/static)。

访问 `localhost:3000/static/xxx` 可以得到静态文件。

### 请求体解析

基于 [koa-body-parser](https://github.com/koajs/bodyparser) 和 [formidable](https://github.com/node-formidable/formidable)。

提供常见请求体解析。

### 路由

基于 [koa-zod-router](https://github.com/jakefenley/koa-zod-router)。

如果不需要 [zod](https://github.com/colinhacks/zod) 验证，可以直接像 [koa-router](https://github.com/koajs/router) 一样使用。

### 数据与分层

由于该模板只应该用于原型开发，所以没有提供数据库等支持，也没有额外分层。

使用 [faker](https://fakerjs.dev/) 构造动态假数据，或使用 `json` / `yaml` 构造静态假数据，在路由方法中直接返回。
