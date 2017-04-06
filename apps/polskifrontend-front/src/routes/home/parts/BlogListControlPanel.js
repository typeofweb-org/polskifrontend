import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogListControlPanel.styl';
import Link from '../../../components/Link/Link';

const BlogListControlPanel = props => {
  const listOptionClass = `${styles['wrapper__link']} ${props.isListOptionSelected ? styles['wrapper__link--active'] : ''}`;
  const tilesOptionClass = `${styles['wrapper__link']} ${props.isTilesOptionSelected ? styles['wrapper__link--active'] : ''}`;

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles['wrapper--left']}`}>
        <Link className={styles['wrapper__submit']} to="/blog-submit">
          <i className="fa fa-plus">
          </i>
          Zgłoś bloga
        </Link>
      </div>
      <div className={`${styles.wrapper} ${styles['wrapper--right']}`}>
        <a className={tilesOptionClass} onClick={props.onTilesOptionClick} href="#">
          <i className="fa fa-th-large">
          </i>
        </a>
        <a className={listOptionClass} onClick={props.onListOptionClick} href="#">
          <i className="fa fa-bars">
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
  isTilesOptionSelected: PropTypes.bool.isRequired
};

export default withStyles(styles)(BlogListControlPanel);

