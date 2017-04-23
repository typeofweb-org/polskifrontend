import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Feedback.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import FeedbackForm from './parts/FeedbackForm';
import Message from '../../components/Indicators/Message';

class Feedback extends React.Component {
  onFeedbackChange(event) {
    const { actions: { feedbackTextChanged } } = this.props;
    feedbackTextChanged(event.target.value || '');
  }

  onEmailChange(event) {
    const { actions: { feedbackEmailChanged } } = this.props;
    feedbackEmailChanged(event.target.value || '');
  }

  onCapchaChange(value) {
    const { actions: { feedbackCaptchaChanged } } = this.props;
    feedbackCaptchaChanged(value);
  }

  onFeedbackSubmit(event) {
    event.preventDefault();

    const { actions: {
      sendFeedback
    }, feedbackState } = this.props;

    if (feedbackState.emailValid && feedbackState.feedbackValid && feedbackState.captcha !== null) {
      sendFeedback(feedbackState.email, feedbackState.feedback);
    }
  }

  onFeedbackSubmitAgain(event) {
    event.preventDefault();

    const { actions: { resetFeedbackState } } = this.props;
    resetFeedbackState();
  }

  onGoBackClick() {
    const { actions: { resetFeedbackState} } = this.props;
    resetFeedbackState();
  }

  render() {
    const { feedbackState } = this.props;

    return (
      <div className={styles.container}>
        <FeedbackForm onFeedbackChange={this.onFeedbackChange.bind(this)}
                      onEmailChange={this.onEmailChange.bind(this)}
                      onCaptchaChange={this.onCapchaChange.bind(this)}
                      onSubmit={this.onFeedbackSubmit.bind(this)}
                      onSubmitAgain={this.onFeedbackSubmitAgain.bind(this)}
                      onGoBackClick={this.onGoBackClick.bind(this)}
                      captcha={feedbackState.captcha}
                      feedbackValid={feedbackState.feedbackValid}
                      feedbackDirty={feedbackState.feedbackDirty}
                      emailValid={feedbackState.emailValid}
                      emailDirty={feedbackState.emailDirty}
                      isSending={feedbackState.sending}
                      sent={feedbackState.sent}
                      shouldCleanUp={feedbackState.shouldCleanUp}
        />
        <Message type="alert" message="Próba wysłania zgłoszenia nie udana. Spróbuj ponownie!" isVisible={feedbackState.sendError} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Feedback));
