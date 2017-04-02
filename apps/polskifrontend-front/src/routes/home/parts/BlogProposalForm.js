import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogProposalForm.styl';

const BlogProposalForm = props => {
  const inputInvalidClass = props.isUrlValid ? null : style['form__input--invalid'];
  const inputClass = `${style['form__input']} ${inputInvalidClass}`;

  const errorMessageVisibleClass = props.isUrlValid ? null : style['wrapper__error--invalid'];
  const errorMessageClass = `${style['wrapper__error']} ${errorMessageVisibleClass}`;

  return (
    <div className={style.container}>
      <div className={style['container__green']}>
      </div>
      <div className={style.wrapper}>
        <p className={style['wrapper__title']}>Uważasz, że brakuje jakiegoś bloga?</p>
        <p className={style['wrapper__description']}>Podaj jego adres - jeśli uznamy, że się nadaje, dodamy go do naszej listy!</p>
        <form className={style.form}>
          <input className={inputClass} type="text" placeholder="podaj adres bloga..." onChange={props.onUrlChange} />
          <button className={style['form__button']}>Zgłoś</button>
        </form>
        <div className={errorMessageClass}>
          Podany adres jest nie prawidłowy!
        </div>
      </div>
    </div>
  );
};

BlogProposalForm.propTypes = {
  onUrlChange: PropTypes.func.isRequired,
  isUrlValid: PropTypes.bool.isRequired
};

export default withStyles(style)(BlogProposalForm);
