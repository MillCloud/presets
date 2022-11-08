# fastify

fastify 模板，只适用于后端服务原型开发。

## 特性

### 日志

基于 [pino](https://github.com/pinojs/pino)、[pino-pretty](https://github.com/pinojs/pino-pretty)。

提供简易清晰的日志输出，不保存本地文件。

### ssl

基于原生支持。

默认不开启，需手动使用 [mkcert](https://github.com/FiloSottile/mkcert) 生成证书并在 [app.ts](./src/app.ts) 打开注释。

### cors

基于 [@fastify/cors](https://github.com/fastify/fastify-cors)。

提供跨域支持。

### 静态文件

基于 [@fastify/static](https://github.com/fastify/fastify-static)。

访问 `localhost:3000/static/xxx` 可以得到静态文件。

### 请求体解析

基于原生支持、[@fastify/formbody](https://github.com/fastify/fastify-formbody)、[@fastify/multipart](https://github.com/fastify/fastify-multipart)。

提供常见请求体解析。

### 路由

基于原生支持。

### 数据与分层

由于该模板只应该用于原型开发，所以没有提供数据库等支持，也没有额外分层。

使用 [faker](https://fakerjs.dev/) 构造动态假数据，或使用 `json` / `yaml` 构造静态假数据，在路由方法中直接返回。
