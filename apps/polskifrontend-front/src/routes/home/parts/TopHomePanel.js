import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './TopHomePanel.styl';

const TopHomePanel = props => {
  return (
    <div className={style.container}>
      <div className={style['container__green']}>
      </div>
      <div className={style.wrapper}>
        <h2 className={style['wrapper__title']}>Serwisy i blogi o front-endzie</h2>
        <p className={style['wrapper__description']}>Wszystkie w jednym miejscu, po polsku!</p>
      </div>
    </div>
  );
};

export default withStyles(style)(TopHomePanel);
