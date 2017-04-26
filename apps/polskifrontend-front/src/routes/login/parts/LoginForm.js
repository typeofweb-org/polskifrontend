import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './LoginForm.styl';

const LoginForm = props => {
  const { onUserChange, onPasswordChange, onLoginClick, buttonDisabled } = props;

  return (
    <div className={style.container}>
      <h2 className={style['container__title']}>Logowanie</h2>
      <div className={style.wrapper}>
        <p className={style['wrapper__description']}>Podaj nazwę użytkownika oraz hasło</p>
        <form className={style.form}>
          <input id="login-user" className={style['form__input']} placeholder="użytkownik" type="text" onChange={onUserChange} />
          <input id="login-password" className={style['form__input']} placeholder="hasło" type="password" onChange={onPasswordChange} />
          <button className={style['form__button']} disabled={buttonDisabled} onClick={onLoginClick}>Zaloguj</button>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onUserChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired
};

export default withStyles(style)(LoginForm);
