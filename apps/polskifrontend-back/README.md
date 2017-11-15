# Node Rest Api

A simple template for building a node restful api service

## Technologies used
- nodejs
- express
- mongodb
- mocha

## Config

Rename `src/config.example.js` file to `src/config.js`. Fulfill all the necessary data in the file:

* cloudinary API login data - [check this website](https://cloudinary.com/console)
* local mongodb data (please see below for more details)
* remote mongodb data (check your Heroku account)

### mongodb config

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
yarn serve
```

## Build for production

```bash
yarn build
```

## Run tests

```bash
yarn test
```

## Deployment

```bash
yarn deploy
```

## DOC
you can visualize the doc and test the api using Swagger Doc through web browser.

URL are as below

[http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!](http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!)

