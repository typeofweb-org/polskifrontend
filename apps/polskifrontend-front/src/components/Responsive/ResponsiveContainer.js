import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ResponsiveContainer.styl';

const ResponsiveContainer = props => {
  const classNames = props.className ? `${props.className} ${style.container}` : style.container;

  return (
    <div className={classNames}>
      {props.children}
    </div>
  );
};

ResponsiveContainer.propTypes = {
  className: PropTypes.any
};

export default withStyles(style)(ResponsiveContainer);
