import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogSubmit.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import SubmitForm from './parts/SubmitForm';

class BlogSubmit extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={styles.container}>
        <SubmitForm />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlogSubmit));
