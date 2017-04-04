import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './AddBlog.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';

class AddBlog extends React.Component {
  static propTypes = {
    onNameChange: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    onRssChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    nameValid: PropTypes.bool.isRequired,
    nameDirty: PropTypes.bool.isRequired,
    urlValid: PropTypes.bool.isRequired,
    urlDirty: PropTypes.bool.isRequired,
    rssValid: PropTypes.bool.isRequired,
    rssDirty: PropTypes.bool.isRequired,
    shouldCleanUp: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    if (this.props.shouldCleanUp) {
      this.refs.name.value = '';
      this.refs.url.value = '';
      this.refs.rss.value = '';
    }
  }

  render() {
    const disabled = (this.props.nameValid && this.props.urlValid && this.props.rssValid) === false;
    const errorClass = isValid => `${style['form__input']} ${isValid ? null : style['form__input--invalid']}`;

    return (
      <ResponsivePanel header="Dodaj bloga" description="Wypełnij poniższe pola aby dodać bloga">
        <form className={style.form} onSubmit={this.props.onFormSubmit}>
          <input className={errorClass(this.props.nameValid || this.props.nameDirty === false)} placeholder="nazwa" onChange={this.props.onNameChange} ref="name" />
          <input className={errorClass(this.props.urlValid || this.props.urlDirty === false)} placeholder="adres url" onChange={this.props.onUrlChange} ref="url" />
          <input className={errorClass(this.props.rssValid || this.props.rssDirty === false)} placeholder="kanał rss" onChange={this.props.onRssChange} ref="rss" />
          <button type="submit" disabled={disabled} className={style['form__button']}>Dodaj</button>
        </form>
      </ResponsivePanel>
    );
  }
}

export default withStyles(style)(AddBlog);
