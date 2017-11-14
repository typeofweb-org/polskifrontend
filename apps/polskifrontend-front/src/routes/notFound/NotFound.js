import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NotFound.styl';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class NotFound extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={style.container}>
        <HeaderSettings currentPath={this.props.context.path} description={this.props.description} title={this.props.title} />
        <h2>404 - nie znaleziono strony</h2>
        <p className={style['container__text']}>Niestety strona, na którą próbowałeś(aś) wejść nie istnieje</p>
      </div>
    );
  }
}

export default withStyles(style)(NotFound);
