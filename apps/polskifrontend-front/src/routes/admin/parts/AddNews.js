import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './AddNews.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';

class AddNews extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    messageDirty: PropTypes.bool.isRequired,
    messageValid: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onMessageChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    shouldCleanUp: PropTypes.bool.isRequired,
    titleDirty: PropTypes.bool.isRequired,
    titleValid: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    if (this.props.shouldCleanUp) {
      this.refs.title.value = '';
      this.refs.message.value = '';
    }
  }

  render() {
    const disabled = (this.props.titleValid && this.props.messageValid) === false;
    const errorClass = isValid => `${style['form__input']} ${isValid ? null : style['form__input--invalid']}`;

    return (
      <div className={style.container}>
        <Link className={style.back} onClick={() => {}} to="/admin">
          <i className="fa fa-arrow-left">
          </i>
          Powrót
        </Link>
        <ResponsivePanel header="Dodaj nową aktualność" description="Wypełnij poniższe pola aby dodać nową aktualność">
          <form className={style.form} onSubmit={this.props.onFormSubmit}>
            <input id="news-title" className={errorClass(this.props.titleValid || this.props.titleDirty === false)} disabled={this.props.isLoading} placeholder="tytuł" onChange={this.props.onTitleChange} ref="title" />
            <textarea id="news-message" className={errorClass(this.props.messageValid || this.props.messageDirty === false)} disabled={this.props.isLoading} placeholder="wiadomość" onChange={this.props.onMessageChange} ref="message" />
            <button type="submit" disabled={disabled || this.props.isLoading} className={style['form__button']}>Dodaj</button>
          </form>
        </ResponsivePanel>
      </div>
    );
  }
}

export default withStyles(style)(AddNews);
