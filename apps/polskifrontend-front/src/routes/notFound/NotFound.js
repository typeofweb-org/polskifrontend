import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NotFound.styl';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={style.container}>
        <h2>404 - nie znaleziono strony</h2>
        <p className={style['container__text']}>Niestety strona, na którą próbowałeś(aś) wejść nie istenie</p>
      </div>
    );
  }
}

export default withStyles(style)(NotFound);
