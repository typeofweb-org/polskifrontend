import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './SubmitForm.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from '../../../components/Link/Link';

class SubmitForm extends React.Component {
  static propTypes = {
    captcha: PropTypes.string,
    emailDirty: PropTypes.bool.isRequired,
    emailValid: PropTypes.bool.isRequired,
    isSending: PropTypes.bool.isRequired,
    onCaptchaChange: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onGoBackClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitAgain: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    sent: PropTypes.bool.isRequired,
    shouldCleanUp: PropTypes.bool.isRequired,
    urlDirty: PropTypes.bool.isRequired,
    urlValid: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    if (this.props.shouldCleanUp) {
      this.refs.urlInput.value = '';
      this.refs.emailInput.value = '';
      this.refs.recaptcha.reset();
    }
  }

  render() {
    const {
      urlValid,
      urlDirty,
      emailValid,
      emailDirty,
      captcha,
      isSending,
      sent
    } = this.props;
    const buttonDisabled = (captcha !== null && urlValid && (emailValid || emailDirty === false)) === false || isSending;
    const isUrlInvalid = urlDirty && urlValid === false;
    const isEmailValid = emailDirty && emailValid === false;

    const urlClass = `${style['fieldset__input']} ${isUrlInvalid ? style['fieldset__input--invalid'] : ''}`;
    const urlLabelClass = `${style['fieldset__label']} ${isUrlInvalid ? style['fieldset__label--visible'] : ''}`;
    const emailClass = `${style['fieldset__input']} ${isEmailValid ? style['fieldset__input--invalid'] : ''}`;
    const emailLabelClass = `${style['fieldset__label']} ${isEmailValid ? style['fieldset__label--visible'] : ''}`;

    const formClass = `${style.form} ${sent ? style['form--invisible'] : ''}`;
    const sentClass = `${style.sent} ${sent ? style['sent--visible'] : ''}`;

    return (
      <div>
        <ResponsivePanel className={style.container} header="Zgłoś serwis" description="">
          <div className={style.nav}>
            <Link className={style.back} onClick={this.props.onGoBackClick} to="/">
              <i className="icon-left-big">
              </i>
              Strona główna
            </Link>
          </div>
          <form className={formClass} onSubmit={this.props.onSubmit}>
            <fieldset className={style.fieldset}>
              <input disabled={isSending} className={urlClass} id="submit-blog-url" type="text" placeholder="Podaj adres adres url" onChange={this.props.onUrlChange} ref="urlInput" />
              <label className={urlLabelClass} htmlFor="submit-blog-url">Adres URL jest wymagany i musi być poprawny</label>
            </fieldset>
            <fieldset className={style.fieldset}>
              <input disabled={isSending} className={emailClass} id="submit-blog-email" type="email" placeholder="Podaj swój email (opcjonalnie)" onChange={this.props.onEmailChange} ref="emailInput" />
              <label className={emailLabelClass} htmlFor="submit-blog-email">Podany email musi być poprawny</label>
            </fieldset>
            <div className={style['form__captcha']}>
              <ReCAPTCHA sitekey="6Le2ABwUAAAAAMLjbtCsFtd2oymEMAAQVw8MZXWs" onChange={this.props.onCaptchaChange} ref="recaptcha"/>
            </div>
            <div className={style.buttons}>
              <button disabled={buttonDisabled} type="submit">Zgłoś</button>
            </div>
            <div style={{ clear: 'both' }}>
            </div>
          </form>
          <div className={sentClass}>
            <div className={style['sent__wrapper']}>
              <p className={style['sent__text']}>Dzięki za zgłoszenie!</p>
              <button className={style['sent__button']} onClick={this.props.onSubmitAgain}>Zgłoś kolejny blog</button>
            </div>
          </div>
        </ResponsivePanel>
      </div>
    );
  }
}

export default withStyles(style)(SubmitForm);
