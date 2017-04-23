import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FeedbackForm.styl';
import Link from '../../../components/Link/Link';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import ReCAPTCHA from 'react-google-recaptcha';

class FeedbackForm extends React.Component {
  render() {
    return (
      <div>
        <Link className={styles.back} to="/">
          <i className="fa fa-arrow-left">
          </i>
          Strona główna
        </Link>
        <ResponsivePanel className={styles.container} header="Zgłoś uwagi" description="Jeśli masz jakieś uwagi co do działania serwisu lub propozycje zmian, skorzystaj z poniższego formularza.">
          <form className={styles.form}>
            <fieldset className={styles.fieldset}>
              <input disabled={false} className={styles['fieldset__input']} id="email" type="email" placeholder="Podaj swój email" ref="emailInput" />
              <label className={styles['fieldset__label']} htmlFor="email">Email jest wymagany i musi być poprawny</label>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <textarea disabled={false} className={styles['fieldset__textarea']} id="message" placeholder="Podaj treść zgłoszenia" ref="messageInput" />
              <label className={styles['fieldset__label']} htmlFor="message">Treść zgłoszenia jest wymagana</label>
            </fieldset>
            <div className={styles['form__captcha']}>
              <ReCAPTCHA sitekey="6Le2ABwUAAAAAMLjbtCsFtd2oymEMAAQVw8MZXWs" onChange={() => {}} ref="recaptcha"/>
            </div>
            <div className={styles.buttons}>
              <button disabled={false} type="submit">Zgłoś</button>
            </div>
            <div style={{ clear: 'both' }}>
            </div>
          </form>
        </ResponsivePanel>
      </div>
    );
  }
}

export default withStyles(styles)(FeedbackForm);
