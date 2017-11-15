import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TopHomeLinks.styl';
import Link from '../../components/Link/Link';

const TopHomeLinks = props => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles['list__item']}>
          <Link className={styles['list__link']} to="/aktualnosci">
            <i className="icon-inbox" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>Aktualności</span>
            {props.newNewsCount === 0
              ? null
              : <div className={styles['list__info']}>{props.newNewsCount}</div>
            }
          </Link>
        </li>
        <li className={styles['list__item']}>
          <Link className={styles['list__link']} to="/o-serwisie">
            <i className="icon-help-circled" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>O serwisie</span>
          </Link>
        </li>
        <li className={styles['list__item']}>
          <Link className={styles['list__link']} to="/zglos-uwagi">
            <i className="icon-commenting" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>Zgłoś uwagi</span>
          </Link>
        </li>
        <li className={styles['list__item']}>
          <a className={styles['list__link']} href="https://www.facebook.com/polskifrontend/" target="_blank" title="Fanpage na Facebooku">
            <i className="icon-facebook-squared" aria-hidden="true">
            </i>
            <span className={styles['list__text']}>Facebook</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

TopHomeLinks.propTypes = {
  newNewsCount: PropTypes.number.isRequired
};

export default withStyles(styles)(TopHomeLinks);
