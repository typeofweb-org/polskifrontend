import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Footer.styl';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <p>Copyright@2017 - Polski Front-End</p>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
