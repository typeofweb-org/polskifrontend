import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Loader.styl';
import image from '../../../public/30.svg';

const Loader = props => {
  const loader = (
    <img className={style['container__loader']} src={image} />
  );

  return (
    <div className={style.container}>
      {props.isLoading ? loader : props.children}
    </div>
  );
};

Loader.propTypes = {
  children: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(style)(Loader);
