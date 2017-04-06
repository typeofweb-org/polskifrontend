import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogListControlPanel.styl';
import Link from '../../../components/Link/Link';

const BlogListControlPanel = props => {
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
        <a disabled className={`${styles['wrapper__link']} ${styles['wrapper__link--active']}`} href="#">
          <i className="fa fa-th-large">
          </i>
        </a>
        <a className={styles['wrapper__link']} href="#">
          <i className="fa fa-bars">
          </i>
        </a>
      </div>
      <div className={styles['container__clear']}>
      </div>
    </div>
  );
};

export default withStyles(styles)(BlogListControlPanel);

