import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './AddBlog.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

const AddBlog = props => {
  const disabled = (props.nameValid && props.urlValid && props.rssValid) === false;
  const errorClass = isValid => `${style['form__input']} ${isValid ? null : style['form__input--invalid']}`;

  return (
    <ResponsivePanel header="Dodaj bloga" description="Wypełnij poniższe pola aby dodać bloga">
      <form className={style.form} onSubmit={props.onFormSubmit}>
        <input className={errorClass(props.nameValid || props.nameDirty === false)} placeholder="nazwa" onChange={props.onNameChange} />
        <input className={errorClass(props.urlValid || props.urlDirty === false)} placeholder="adres url" onChange={props.onUrlChange} />
        <input className={errorClass(props.rssValid || props.rssDirty === false)} placeholder="kanał rss" onChange={props.onRssChange} />
        <button type="submit" disabled={disabled} className={style['form__button']}>Dodaj</button>
      </form>
    </ResponsivePanel>
  );
};

AddBlog.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  onRssChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  nameValid: PropTypes.bool.isRequired,
  nameDirty: PropTypes.bool.isRequired,
  urlValid: PropTypes.bool.isRequired,
  urlDirty: PropTypes.bool.isRequired,
  rssValid: PropTypes.bool.isRequired,
  rssDirty: PropTypes.bool.isRequired
};

export default withStyles(style)(AddBlog);
