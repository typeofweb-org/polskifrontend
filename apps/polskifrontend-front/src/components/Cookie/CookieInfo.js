import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CookieInfo.styl';
import * as cookies from '../../core/helpers/cookieHelper';

class CookieInfo extends React.Component {
  constructor(props) {
    super(props);
    const shouldBeClosed = cookies.get('cookie-accepted');
    this.state = { shouldBeClosed: shouldBeClosed || false };
  }

  onOkClick(event) {
    event.preventDefault();

    cookies.set(true, 'cookie-accepted', { path: '/', expires: new Date(2050, 1, 1) });
    this.setState({
      shouldBeClosed: true
    });
  }

  render() {
    const containerClass = `${styles.container} ${this.state.shouldBeClosed ? styles['container--invisible'] : ''}`;

    return (
      <div className={containerClass}>
        <p className={styles['container__text']}>Ta strona, tak jak praktycznie każda w internecie, wykorzystuje ciasteczka.</p>
        <a className={styles['container__button']} href="#" onClick={this.onOkClick.bind(this)}>Rozumiem</a>
      </div>
    );
  }
}

export default withStyles(styles)(CookieInfo);
