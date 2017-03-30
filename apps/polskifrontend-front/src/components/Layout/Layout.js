import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Layout.styl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default withStyles(style)(Layout);
