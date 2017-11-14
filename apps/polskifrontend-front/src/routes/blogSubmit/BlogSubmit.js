import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './BlogSubmit.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import SubmitForm from './parts/SubmitForm';
import Message from '../../components/Indicators/Message';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class BlogSubmit extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    submitState: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  onUrlChange(event) {
    const { actions: { urlChanged } } = this.props;
    urlChanged(event.target.value || '');
  }

  onEmailChange(event) {
    const { actions: { emailChanged } } = this.props;
    emailChanged(event.target.value || '');
  }

  onCapchaChange(value) {
    const { actions: { captchaChanged } } = this.props;
    captchaChanged(value);
  }

  onBlogSubmit(event) {
    event.preventDefault();

    const { actions: {
      sendBlogRequest
    }, submitState } = this.props;

    if (submitState.urlValid && (submitState.emailValid || submitState.emailDirty === false) && submitState.captcha !== null) {
      sendBlogRequest(submitState.url, submitState.email);
    }
  }

  onSubmitAgain(event) {
    event.preventDefault();

    const { actions: { resetSubmitState } } = this.props;
    resetSubmitState();
  }

  onGoBackClick() {
    const { actions: { resetSubmitState } } = this.props;
    resetSubmitState();
  }

  render() {
    const { submitState, description, title, context } = this.props;

    return (
      <div className={styles.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        <SubmitForm onUrlChange={this.onUrlChange.bind(this)}
                    onEmailChange={this.onEmailChange.bind(this)}
                    onCaptchaChange={this.onCapchaChange.bind(this)}
                    onSubmit={this.onBlogSubmit.bind(this)}
                    onSubmitAgain={this.onSubmitAgain.bind(this)}
                    onGoBackClick={this.onGoBackClick.bind(this)}
                    captcha={submitState.captcha}
                    urlValid={submitState.urlValid}
                    urlDirty={submitState.urlDirty}
                    emailValid={submitState.emailValid}
                    emailDirty={submitState.emailDirty}
                    isSending={submitState.sending}
                    sent={submitState.sent}
                    shouldCleanUp={submitState.shouldCleanUp}
        />
        <Message type="alert" message="Próba wysłania zgłoszenia nie udana. Spróbuj ponownie!" isVisible={submitState.sendError} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlogSubmit));
