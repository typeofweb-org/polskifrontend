import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './AddBlog.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';

class AddBlog extends React.Component {
  static propTypes = {
    addBlogLoading: PropTypes.bool.isRequired,
    nameDirty: PropTypes.bool.isRequired,
    nameValid: PropTypes.bool.isRequired,
    newBlogName: PropTypes.string,
    newBlogRss: PropTypes.string,
    newBlogUrl: PropTypes.string,
    onFaviconRefresh: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onRssChange: PropTypes.func.isRequired,
    onSlugRefresh: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    rssDirty: PropTypes.bool.isRequired,
    rssValid: PropTypes.bool.isRequired,
    shouldCleanUp: PropTypes.bool.isRequired,
    urlDirty: PropTypes.bool.isRequired,
    urlValid: PropTypes.bool.isRequired
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
        <button className={style.slug} onClick={this.props.onFaviconRefresh} disabled={this.props.addBlogLoading}>
          <i className="icon-arrows-cw">
          </i>
          Odśwież favicons
        </button>
        <ResponsivePanel header="Dodaj bloga" description="Wypełnij poniższe pola aby dodać bloga">
          <form className={style.form} onSubmit={this.props.onFormSubmit}>
            <input id="blog-name" className={errorClass(this.props.nameValid || this.props.nameDirty === false)} disabled={this.props.addBlogLoading} placeholder="nazwa" onChange={this.props.onNameChange} ref="name" value={this.props.newBlogName} />
            <input id="blog-url" className={errorClass(this.props.urlValid || this.props.urlDirty === false)} disabled={this.props.addBlogLoading} placeholder="adres url" onChange={this.props.onUrlChange} ref="url" value={this.props.newBlogUrl} />
            <input id="blog-rss" className={errorClass(this.props.rssValid || this.props.rssDirty === false)} disabled={this.props.addBlogLoading} placeholder="kanał rss" onChange={this.props.onRssChange} ref="rss" value={this.props.newBlogRss} />
            <button type="submit" disabled={disabled || this.props.addBlogLoading} className={style['form__button']}>Dodaj</button>
          </form>
        </ResponsivePanel>
      </div>
    );
  }
}

export default withStyles(style)(AddBlog);
