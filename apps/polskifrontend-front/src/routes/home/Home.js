import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';

class Home extends React.Component {
  render() {
    return (
      <div>
        Hello world!
      </div>
    );
  }
}

export default withStyles(style)(Home);
