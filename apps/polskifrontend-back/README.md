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
```

## Before first run

```bash
yarn
```

## Run app

```bash
npm run serve
```

## Build for production

```bash
npm run build
```

## Run tests

```bash
npm run test
```

## DOC
you can visualize the doc and test the api using Swagger Doc through web browser.

URL are as below

[http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!](http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!)

