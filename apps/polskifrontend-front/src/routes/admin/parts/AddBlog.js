import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './AddBlog.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

const AddBlog = props => {
  return (
    <ResponsivePanel header="Dodaj bloga" description="Wypełnij poniższe pola aby dodać bloga" >
      <form className={style.form}>
        <input className={style['form__input']} placeholder="nazwa"/>
        <input className={style['form__input']} placeholder="adres url"/>
        <input className={style['form__input']} placeholder="kanał rss"/>
        <button className={style['form__button']}>Dodaj</button>
      </form>
    </ResponsivePanel>
  );
};

export default withStyles(style)(AddBlog);
