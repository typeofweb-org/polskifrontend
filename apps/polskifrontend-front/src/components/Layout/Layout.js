import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Layout.styl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TopHomePanel from './TopHomePanel';
import TopHomeLinks from './TopHomeLinks';
import CookieInfo from '../Cookie/CookieInfo';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.pusher}>
        </div>
        <Header />
        <TopHomePanel />
        <TopHomeLinks />
        {this.props.children}
        <Footer />
        <CookieInfo />
      </div>
    );
  }
}

export default withStyles(style)(Layout);
