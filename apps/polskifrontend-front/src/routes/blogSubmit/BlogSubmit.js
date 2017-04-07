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

  render() {
    const { submitState } = this.props;

    return (
      <div className={styles.container}>
        <SubmitForm onUrlChange={this.onUrlChange.bind(this)}
                    onEmailChange={this.onEmailChange.bind(this)}
                    onCaptchaChange={this.onCapchaChange.bind(this)}
                    captcha={submitState.captcha}
                    urlValid={submitState.urlValid}
                    urlDirty={submitState.urlDirty}
                    emailValid={submitState.emailValid}
                    emailDirty={submitState.emailDirty}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlogSubmit));
