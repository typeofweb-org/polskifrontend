import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Feedback.styl';
import FeedbackForm from './parts/FeedbackForm';

class Feedback extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <FeedbackForm />
      </div>
    );
  }
}

export default withStyles(styles)(Feedback);
