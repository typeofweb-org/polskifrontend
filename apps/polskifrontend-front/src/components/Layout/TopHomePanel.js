import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './TopHomePanel.styl';

const TopHomePanel = props => {
  return (
    <div className={style.container}>
      <div className={style['container__green']}>
      </div>
      <div className={style.wrapper}>
        <h2 className={style['wrapper__title']}>Serwisy na temat front-endu</h2>
        <p className={style['wrapper__description']}>Wszystkie w jednym miejscu. Po polsku!</p>
      </div>
    </div>
  );
};

export default withStyles(style)(TopHomePanel);
