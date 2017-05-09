import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NotFound.styl';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    context: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={style.container}>
        <HeaderSettings description={this.props.description} title={this.props.title} currentPath={this.props.context.path} />
        <h2>404 - nie znaleziono strony</h2>
        <p className={style['container__text']}>Niestety strona, na którą próbowałeś(aś) wejść nie istnieje</p>
      </div>
    );
  }
}

export default withStyles(style)(NotFound);
