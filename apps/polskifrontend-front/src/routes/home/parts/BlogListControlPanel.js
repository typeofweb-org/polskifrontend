import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogListControlPanel.styl';
import Link from '../../../components/Link/Link';

const BlogListControlPanel = props => {
  let listOptionClass = `${styles['wrapper__link']} ${props.isListOptionSelected ? styles['wrapper__link--active'] : ''}`;
  let tilesOptionClass = `${styles['wrapper__link']} ${props.isTilesOptionSelected ? styles['wrapper__link--active'] : ''}`;
  let wrapperClass = styles['wrapper__submit'];
  const disabledLinkClass = styles['wrapper__link--disabled'];
  const disabledWrapperClass = styles['wrapper__submit--disabled'];

  if (props.isLoading) {
    listOptionClass = `${listOptionClass} ${disabledLinkClass}`;
    tilesOptionClass = `${tilesOptionClass} ${disabledLinkClass}`;
    wrapperClass = `${wrapperClass} ${disabledWrapperClass}`;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles['wrapper--left']}`}>
        <Link className={wrapperClass} to="/zglos-serwis">
          <i className="icon-plus">
          </i>
          Zgłoś serwis
        </Link>
      </div>
      <div className={`${styles.wrapper} ${styles['wrapper--right']}`}>
        <a className={tilesOptionClass} onClick={props.onTilesOptionClick} href="#">
          <i className="icon-th-large">
          </i>
        </a>
        <a className={listOptionClass} onClick={props.onListOptionClick} href="#">
          <i className="icon-menu">
          </i>
        </a>
      </div>
      <div className={styles['container__clear']}>
      </div>
    </div>
  );
};

BlogListControlPanel.propTypes = {
  onListOptionClick: PropTypes.func.isRequired,
  onTilesOptionClick: PropTypes.func.isRequired,
  isListOptionSelected: PropTypes.bool.isRequired,
  isTilesOptionSelected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(BlogListControlPanel);

