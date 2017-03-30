import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Header.styl';
import Link from '../Link/Link';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <h1>Polski Front-End</h1>
        </Link>
      </div>
    );
  }
}

export default withStyles(style)(Header);
