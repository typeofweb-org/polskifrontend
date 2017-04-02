import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Header.styl';
import Link from '../Link/Link';
import logo from '../../../public/polskifrontend.png';

class Header extends React.Component {
  render() {
    return (
      <div className={style.header}>
        <Link className={style['header__link']} to="/">
          <h1 className={style['header__title']}>
            <img src={logo} />
          </h1>
        </Link>
      </div>
    );
  }
}

export default withStyles(style)(Header);
