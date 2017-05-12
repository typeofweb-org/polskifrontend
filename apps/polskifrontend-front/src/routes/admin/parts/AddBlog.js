import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './AddBlog.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';

class AddBlog extends React.Component {
  static propTypes = {
    onNameChange: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    onRssChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onSlugRefresh: PropTypes.func.isRequired,
    nameValid: PropTypes.bool.isRequired,
    nameDirty: PropTypes.bool.isRequired,
    urlValid: PropTypes.bool.isRequired,
    urlDirty: PropTypes.bool.isRequired,
    rssValid: PropTypes.bool.isRequired,
    rssDirty: PropTypes.bool.isRequired,
    shouldCleanUp: PropTypes.bool.isRequired,
    addBlogLoading: PropTypes.bool.isRequired
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
      <div className={style.container}>
        <Link className={style.news} to="/admin/news">
          <i className="icon-doc-inv">
          </i>
          Aktualności
        </Link>
        <button className={style.slug} onClick={this.props.onSlugRefresh} disabled={this.props.addBlogLoading}>
          <i className="icon-arrows-cw">
          </i>
          Odśwież slugi
        </button>
        <ResponsivePanel header="Dodaj bloga" description="Wypełnij poniższe pola aby dodać bloga">
          <form className={style.form} onSubmit={this.props.onFormSubmit}>
            <input id="blog-name" className={errorClass(this.props.nameValid || this.props.nameDirty === false)} disabled={this.props.addBlogLoading} placeholder="nazwa" onChange={this.props.onNameChange} ref="name" />
            <input id="blog-url" className={errorClass(this.props.urlValid || this.props.urlDirty === false)} disabled={this.props.addBlogLoading} placeholder="adres url" onChange={this.props.onUrlChange} ref="url" />
            <input id="blog-rss" className={errorClass(this.props.rssValid || this.props.rssDirty === false)} disabled={this.props.addBlogLoading} placeholder="kanał rss" onChange={this.props.onRssChange} ref="rss" />
            <button type="submit" disabled={disabled || this.props.addBlogLoading} className={style['form__button']}>Dodaj</button>
          </form>
        </ResponsivePanel>
      </div>
    );
  }
}

export default withStyles(style)(AddBlog);
