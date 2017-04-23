import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TopHomeLinks.styl';
import Link from '../../components/Link/Link';

const TopHomePanel = props => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles['list__item']}>
          <Link className={styles['list__link']} to="/aktualnosci">
            <i className="fa fa-inbox" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>Aktualności</span>
            <div className={styles['list__info']}>
              3
            </div>
          </Link>
        </li>
        <li className={styles['list__item']}>
          <Link className={styles['list__link']} to="/o-serwisie">
            <i className="fa fa-question-circle" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>O serwisie</span>
          </Link>
        </li>
        <li className={styles['list__item']}>
          <Link className={styles['list__link']} to="/zglos-uwagi">
            <i className="fa fa-commenting" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>Zgłoś uwagi</span>
          </Link>
        </li>
        <li className={styles['list__item']}>
          <a className={styles['list__link']} href="https://www.facebook.com/polskifrontend/" target="_blank" title="Fanpage na Facebooku">
            <i className="fa fa-facebook-square" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>Facebook</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default withStyles(styles)(TopHomePanel);
