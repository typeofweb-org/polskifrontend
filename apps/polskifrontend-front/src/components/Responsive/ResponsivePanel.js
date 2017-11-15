import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ResponsivePanel.styl';
import ResponsiveContainer from './ResponsiveContainer';
import ReactImageFallback from 'react-image-fallback';
import noImage from '../../../public/no_image.png';

function getHeaderContent(properties) {
  return (
    <div>
      {properties.showImage && properties.image ?
        <ReactImageFallback alt={`${properties.header} - ikona`}
                            className={style['container__favicon']}
                            src={properties.image}
                            fallbackImage={noImage}
                            initialImage={noImage} />
        : null}
      {properties.header}
    </div>
  );
}

const ResponsivePanel = (props) => {
  return (
    <ResponsiveContainer className={props.className}>
      <div className={style.container}>
        <h2 className={style['container__title']}>
          {props.href && props.href !== ''
            ? <a className={style['container__link']} target="_blank" href={props.href} rel="nofollow">
                {getHeaderContent(props)}
              </a>
            : getHeaderContent(props)
          }
        </h2>
        <div className={style.wrapper}>
          {props.description ? <p className={style['wrapper__description']}>{props.description}</p> : null}
          {props.children}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

ResponsivePanel.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.any,
  description: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  href: PropTypes.string,
  image: PropTypes.string,
  showImage: PropTypes.bool
};

export default withStyles(style)(ResponsivePanel);
