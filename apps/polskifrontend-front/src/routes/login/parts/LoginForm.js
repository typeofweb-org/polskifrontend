import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './LoginForm.styl';

const LoginForm = () => {
  return (
    <div className={style.container}>
      <h2 className={style['container__title']}>Logowanie</h2>
      <div className={style.wrapper}>
        <form className={style.form}>
          <input className={style['form__input']} placeholder="użytkownik" type="text" />
          <input className={style['form__input']} placeholder="hasło" type="password" />
          <button className={style['form__button']}>Zaloguj</button>
        </form>
      </div>
    </div>
  );
};

export default withStyles(style)(LoginForm);
