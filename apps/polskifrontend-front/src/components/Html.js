/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { analytics } from '../config';

class Html extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired
    }).isRequired),
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    state: null
  };

  render() {
    const { styles, scripts, state, children, helmet } = this.props;
    return (
      <html className="no-js" lang="pl" style={{ position: 'relative', minHeight: '100%' }}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          <meta name="viewport" content="width=device-width" />
          <link rel="shortcut icon" href="/polskifrontend_icon.png" />
          <link rel="apple-touch-icon" href="/polskifrontend_icon.png" />
          <link rel="alternate" type="application/rss+xml" title="Polski Front-End" href="http://www.polskifrontend.pl/feed" />
          <link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600|Cabin:400,700&subset=latin-ext" rel="stylesheet" />
          {styles.map(style => (
            <style key={style.id}
                   id={style.id}
                   // eslint-disable-next-line react/no-danger
                   dangerouslySetInnerHTML={{ __html: style.cssText }}
            />),
          )}
        </head>
        <body>
          <div
            id="app"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {state && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {scripts.map(script => <script key={script} src={script} />)}
          {analytics.google.trackingId &&
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
        </body>
      </html>
    );
  }
}

export default Html;
