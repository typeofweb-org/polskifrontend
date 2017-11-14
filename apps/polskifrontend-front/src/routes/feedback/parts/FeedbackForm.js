import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FeedbackForm.styl';
import Link from '../../../components/Link/Link';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import ReCAPTCHA from 'react-google-recaptcha';

class FeedbackForm extends React.Component {
  static propTypes = {
    captcha: PropTypes.string,
    emailDirty: PropTypes.bool.isRequired,
    emailValid: PropTypes.bool.isRequired,
    feedbackDirty: PropTypes.bool.isRequired,
    feedbackValid: PropTypes.bool.isRequired,
    isSending: PropTypes.bool.isRequired,
    onCaptchaChange: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onFeedbackChange: PropTypes.func.isRequired,
    onGoBackClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitAgain: PropTypes.func.isRequired,
    sent: PropTypes.bool.isRequired,
    shouldCleanUp: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    if (this.props.shouldCleanUp) {
      this.refs.feedbackInput.value = '';
      this.refs.emailInput.value = '';
      this.refs.recaptcha.reset();
    }
  }

  render() {
    const {
      feedbackValid,
      feedbackDirty,
      emailValid,
      emailDirty,
      captcha,
      isSending,
      sent
    } = this.props;
    const buttonDisabled = (captcha !== null && feedbackValid && emailValid) === false || isSending;
    const isFeedbackInvalid = feedbackDirty && feedbackValid === false;
    const isEmailInvalid = emailDirty && emailValid === false;

    const feedbackClass = `${styles['fieldset__textarea']} ${isFeedbackInvalid ? styles['fieldset__textarea--invalid'] : ''}`;
    const feedbackLabelClass = `${styles['fieldset__label']} ${isFeedbackInvalid ? styles['fieldset__label--visible'] : ''}`;
    const emailClass = `${styles['fieldset__input']} ${isEmailInvalid ? styles['fieldset__input--invalid'] : ''}`;
    const emailLabelClass = `${styles['fieldset__label']} ${isEmailInvalid ? styles['fieldset__label--visible'] : ''}`;

    const formClass = `${styles.form} ${sent ? styles['form--invisible'] : ''}`;
    const sentClass = `${styles.sent} ${sent ? styles['sent--visible'] : ''}`;

    return (
      <div>
        <ResponsivePanel className={styles.container} header="Zgłoś uwagi" description="">
          <div className={styles.nav}>
            <Link className={styles.back} onClick={this.props.onGoBackClick} to="/">
              <i className="icon-left-big">
              </i>
              Strona główna
            </Link>
          </div>
          <form className={formClass} onSubmit={this.props.onSubmit}>
            <fieldset className={styles.fieldset}>
              <input disabled={isSending} className={emailClass} id="feedback-email" type="email" placeholder="Podaj swój email" onChange={this.props.onEmailChange} ref="emailInput" />
              <label className={emailLabelClass} htmlFor="feedback-email">Email jest wymagany i musi być poprawny</label>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <textarea disabled={isSending} className={feedbackClass} id="feedback-message" placeholder="Podaj treść zgłoszenia" onChange={this.props.onFeedbackChange} ref="feedbackInput" />
              <label className={feedbackLabelClass} htmlFor="feedback-message">Treść zgłoszenia jest wymagana</label>
            </fieldset>
            <div className={styles['form__captcha']}>
              <ReCAPTCHA sitekey="6Le2ABwUAAAAAMLjbtCsFtd2oymEMAAQVw8MZXWs" onChange={this.props.onCaptchaChange} ref="recaptcha"/>
            </div>
            <div className={styles.buttons}>
              <button disabled={buttonDisabled} type="submit">Zgłoś</button>
            </div>
            <div style={{ clear: 'both' }}>
            </div>
          </form>
          <div className={sentClass}>
            <div className={styles['sent__wrapper']}>
              <p className={styles['sent__text']}>Dzięki za zgłoszenie!</p>
              <button className={styles['sent__button']} onClick={this.props.onSubmitAgain}>Zgłoś więcej uwag</button>
            </div>
          </div>
        </ResponsivePanel>
      </div>
    );
  }
}

export default withStyles(styles)(FeedbackForm);
