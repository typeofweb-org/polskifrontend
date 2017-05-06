import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Articles.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

class Articles extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        Articles
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Articles));
