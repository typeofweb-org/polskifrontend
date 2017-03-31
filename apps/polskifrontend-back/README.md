# Node Rest Api

A simple template for building a node restful api service

## Technologies used
- nodejs
- express
- mongodb
- mocha
- swagger-jsdoc

## mongodb config
``` bash
# mongodb config
# config locate in: src/config.js
mongodb: {
  host: 'localhost',
  database: 'example'
}
# or you can add an mongodb account for security
mongodb: {
  host: 'localhost',
  database: 'example',
  user:'user',
  password:'pwd'
}

## Before first run
yarn

## Run app
npm run start

## Build for production
npm run build

## Run tests
npm run test



```

## DOC
you can visualize the doc and test the api using Swagger Doc through web browser.

URL are as below

[http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!](http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!)

## 项目结构
```
/src              项目源码文件夹
  /models         使用mongoose定义的model的目录
  /routes         项目路由文件目录
  /utils          封装的工具函数目录
  config.js         配置文件
  log.js            export了一个log模块
  main.js           程序入口文件
package.json      
README.md
.babelrc
.eslintrc
```
