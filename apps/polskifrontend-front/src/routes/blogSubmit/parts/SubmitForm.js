import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './SubmitForm.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import ReCAPTCHA from 'react-google-recaptcha';

class SubmitForm extends React.Component {
  static propTypes = {
    onUrlChange: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onCaptchaChange: PropTypes.func.isRequired,
    urlValid: PropTypes.bool.isRequired,
    urlDirty: PropTypes.bool.isRequired,
    emailValid: PropTypes.bool.isRequired,
    emailDirty: PropTypes.bool.isRequired,
    captcha: PropTypes.string
  };

  render() {
    const {
      urlValid,
      urlDirty,
      emailValid,
      emailDirty,
      captcha
    } = this.props;
    const buttonDisabled = (captcha !== null && urlValid && emailValid) === false;
    const isUrlInvalid = urlDirty && urlValid === false;
    const isEmailValid = emailDirty && emailValid === false;

    const urlClass = `${style['fieldset__input']} ${isUrlInvalid ? style['fieldset__input--invalid'] : ''}`;
    const urlLabelClass = `${style['fieldset__label']} ${isUrlInvalid ? style['fieldset__label--visible'] : ''}`;
    const emailClass = `${style['fieldset__input']} ${isEmailValid ? style['fieldset__input--invalid'] : ''}`;
    const emailLabelClass = `${style['fieldset__label']} ${isEmailValid ? style['fieldset__label--visible'] : ''}`;

    return (
      <ResponsivePanel className={style.container} header="Zgłoś bloga" description="Jeśli uważasz, że jakiś blog lub serwis internetowy powinien się tutaj znaleźć, podaj poniżej jego adres. Jeżeli się nada, zostanie dodany do serwisu!">
        <form className={style.form}>
          <fieldset className={style.fieldset}>
            <input className={urlClass} id="url" type="text" placeholder="Podaj adres adres url" onChange={this.props.onUrlChange}/>
            <label className={urlLabelClass} htmlFor="url">Adres URL jest wymagany i musi być poprawny</label>
          </fieldset>
          <fieldset className={style.fieldset}>
            <input className={emailClass} type="email" placeholder="Podaj swój email (opcjonalnie)" onChange={this.props.onEmailChange}/>
            <label className={emailLabelClass} htmlFor="url">Podany email musi być poprawny</label>
          </fieldset>
          <div className={style['form__captcha']}>
            <ReCAPTCHA sitekey="6Le2ABwUAAAAAMLjbtCsFtd2oymEMAAQVw8MZXWs" onChange={this.props.onCaptchaChange}/>
          </div>
          <div className={style.buttons}>
            <button disabled={buttonDisabled} type="submit">Zgłoś</button>
          </div>
          <div style={{ clear: 'both' }}>
          </div>
        </form>
      </ResponsivePanel>
    );
  }
}

export default withStyles(style)(SubmitForm);
