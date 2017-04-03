import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ResponsivePanel.styl';
import ResponsiveContainer from './ResponsiveContainer';

const ResponsivePanel = props => {
  return (
    <ResponsiveContainer className={props.className}>
      <div className={style.container}>
        <h1 className={style['container__title']}>{props.header}</h1>
        <div className={style.wrapper}>
          <p className={style['wrapper__description']}>{props.description}</p>
          {props.children}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

ResponsivePanel.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.any
};

export default withStyles(style)(ResponsivePanel);
