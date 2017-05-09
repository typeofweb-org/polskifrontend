import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ResponsivePanel.styl';
import ResponsiveContainer from './ResponsiveContainer';
import ReactImageFallback from 'react-image-fallback';
import noImage from '../../../public/no_image_dark.png';

function getHeaderContent(props) {
  return (
    <div>
      {props.showImage && props.image ?
        <ReactImageFallback alt={`${props.header} - ikona`}
                            className={style['container__favicon']}
                            src={props.image}
                            fallbackImage={noImage}
                            initialImage={noImage} />
        : null}
      {props.header}
    </div>
  );
}

const ResponsivePanel = props => {
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
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.any,
  image: PropTypes.string,
  showImage: PropTypes.bool,
  href: PropTypes.string
};

export default withStyles(style)(ResponsivePanel);
