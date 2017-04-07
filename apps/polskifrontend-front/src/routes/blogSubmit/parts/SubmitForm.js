import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './SubmitForm.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import ReCAPTCHA from 'react-google-recaptcha';

class SubmitForm extends React.Component {
  static propTypes = {
  };

  onRecaptchaChange(value) {
    console.log(value);
  }

  render() {
    // const disabled = (this.props.nameValid && this.props.urlValid && this.props.rssValid) === false;
    // const errorClass = isValid => `${style['form__input']} ${isValid ? null : style['form__input--invalid']}`;

    return (
      <ResponsivePanel className={style.container} header="Zgłoś bloga" description="Jeśli uważasz, że jakiś blog lub serwis internetowy powinien się tutaj znaleźć, podaj poniżej jego adres. Jeżeli się nada, zostanie dodany do serwisu!">
        <form className={style.form}>
          <input className={style['form__input']} type="text" placeholder="Podaj adres adres url"/>
          <input className={style['form__input']} type="text" placeholder="Podaj swój email (w razie pytań)"/>
          <div className={style['form__captcha']}>
            <ReCAPTCHA sitekey="6Le2ABwUAAAAAMLjbtCsFtd2oymEMAAQVw8MZXWs" onChange={this.onRecaptchaChange.bind(this)}/>
          </div>
          <div className={style.buttons}>
            <button type="submit">Zgłoś</button>
          </div>
          <div style={{ clear: 'both' }}>
          </div>
        </form>
      </ResponsivePanel>
    );
  }
}

export default withStyles(style)(SubmitForm);
