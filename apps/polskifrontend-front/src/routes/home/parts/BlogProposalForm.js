import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BlogProposalForm.styl';

const BlogProposalForm = props => {
  return (
    <div className={style.container}>
      <div className={style['container__green']}>
      </div>
      <div className={style.wrapper}>
        <p className={style['wrapper__title']}>Uważasz, że brakuje jakiegoś bloga?</p>
        <p className={style['wrapper__description']}>Podaj jego adres - jeśli uznamy, że się nadaje, dodamy go do naszej listy!</p>
        <form className={style.form}>
          <input className={style['form__input']} type="text" placeholder="podaj adres bloga..." onChange={props.onUrlChange} />
          <button className={style['form__button']}>Zgłoś</button>
        </form>
      </div>
    </div>
  );
};

BlogProposalForm.propTypes = {
  onUrlChange: PropTypes.func.isRequired
};

export default withStyles(style)(BlogProposalForm);
