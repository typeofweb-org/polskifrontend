/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.styl';
import routes from './routes';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import getHomeInitialState from './store/serverSideInitializers/homeInitializer';
import getAdminInitialState from './store/serverSideInitializers/adminBlogsInitializer';
import getAdminNewsInitialState from './store/serverSideInitializers/adminNewsInitializer';
import getNewsInitialState from './store/serverSideInitializers/newsInitializer';
import { initialState as articlesState } from './reducers/articles';
import { port, auth, apiUrl } from './config';
import cookie from 'react-cookie';
import fetch from './core/fetch';
import { Helmet } from 'react-helmet';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 2592000,
  setHeaders: (res) => {
    res.set("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sitemap handling
app.get('/sitemap.xml', async (req, res) => {
  const url = `${apiUrl}/misc/sitemap`;
  const getData = async () => {
    const response = await fetch(url, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' });
    return await response.json();
  };

  const sitemap = await getData();

  if (sitemap.success === false) {
    return res.status(503).end();
  }

  res.header('Content-Type', 'application/xml');
  res.send(sitemap.xml);
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  // redirects
  if (!__DEV__) {
    if (req.hostname.indexOf('polskifrontend-front.herokuapp.com') > -1) {
      res.redirect(301, 'http://www.polskifrontend.pl' + req.originalUrl);
    }

    // const checkHost = req.get('host').substring(0, 4);
    // const condition = req.get('x-forwarded-proto') !== "https" || checkHost !== 'www.' || ( req.get('host').indexOf('www.') < 0);
    // if (condition) {
    //   res.set('x-forwarded-proto', 'https');
    //
    //   if (checkHost === 'www.' && ( req.get('host').indexOf('www.') >= 0)) {
    //     res.redirect('https://' + req.get('host') + req.url);
    //   }
    //   else {
    //     res.redirect('https://www.' + req.get('host') + req.url);
    //   }
    // }
  }

  // try to get settings form cookie
  // const settings = req.cookies.PL_FRONT_END_USER_SETTINGS ? JSON.parse(req.cookies.PL_FRONT_END_USER_SETTINGS) : { tiles: true };
  try {
    cookie.plugToRequest(req, res);

    const settings = cookie.load('PL_FRONT_END_USER_SETTINGS') || { tiles: true, clickedLinks: [], lastNewsVisit: new Date(1900, 1, 1) };
    const authCookie = cookie.load('PL_FRONT_END');

    const homeState = await getHomeInitialState(settings);
    const blogsState = await getAdminInitialState(authCookie);
    const adminNewsState = await getAdminNewsInitialState(authCookie);
    const newsState = await getNewsInitialState();

    const adminState = {
      tokenExpired: blogsState.tokenExpired || adminNewsState.tokenExpired
    };

    const store = configureStore({
      homeState,
      adminState,
      newsState,
      articlesState,
      adminBlogsState: blogsState.adminBlogsState,
      adminNewsState: adminNewsState.adminNewsState
    }, {
      cookie: req.header.cookie
    });

    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.fullUrl = `http://www.polskifrontend.pl${req.originalUrl}`;
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.styles = [
      { id: 'css', cssText: [...css].join('') }
    ];
    data.scripts = [
      assets.vendor.js,
      assets.client.js
    ];
    data.state = context.store.getState();
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

    data.helmet = Helmet.renderStatic();

    cookie.plugToRequest(req, res);
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
// models.sync().catch(err => console.error(err.stack)).then(() => {
//
// });
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
