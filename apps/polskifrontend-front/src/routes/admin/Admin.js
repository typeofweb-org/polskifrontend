import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Admin.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import AddBlog from './parts/AddBlog';
import BlogList from './parts/BlogList';
import Message from '../../components/Messaging/Message';

class Add extends React.Component {
  componentDidMount() {
    const { actions: { getAdminBlogList } } = this.props;
    getAdminBlogList();
  }

  onDeleteClick(id, event) {
    event.preventDefault();
    const { actions: { deleteBlog } } = this.props;
    deleteBlog(id);
  }

  onEditClick(id, event) {
    event.preventDefault();
    console.log(id);
  }

  onNameChange(event) {
    event.preventDefault();
    const { actions: { newBlogNameChanged } } = this.props;
    newBlogNameChanged(event.target.value);
  }

  onUrlChange(event) {
    event.preventDefault();
    const { actions: { newBlogUrlChanged } } = this.props;
    newBlogUrlChanged(event.target.value);
  }

  onRssChange(event) {
    event.preventDefault();
    const { actions: { newBlogRssChanged } } = this.props;
    newBlogRssChanged(event.target.value);
  }

  onAddFormSubmit(event) {
    event.preventDefault();

    const {
      actions: {
        addBlog
      },
      adminState: {
        newBlogName,
        newBlogNameValid,
        newBlogUrl,
        newBlogUrlValid,
        newBlogRss,
        newBlogRssValid
      } } = this.props;

    console.log(newBlogNameValid && newBlogUrlValid && newBlogRssValid);
    if (newBlogNameValid && newBlogUrlValid && newBlogRssValid) {
      addBlog({ name: newBlogName, href: newBlogUrl, rss: newBlogRss });
    }
  }

  render() {
    const { adminState: {
      blogList,
      blogListLoading,
      blogListError,
      newBlogNameValid,
      newBlogNameDirty,
      newBlogUrlValid,
      newBlogUrlDirty,
      newBlogRssValid,
      newBlogRssDirty
    } } = this.props;
    const errorMessage = blogListError ? 'Błąd pobierania blogów - spróbuj odświezyć stronę' : '';

    return (
      <div className={style.container}>
        <AddBlog onNameChange={this.onNameChange.bind(this)}
                 onUrlChange={this.onUrlChange.bind(this)}
                 onRssChange={this.onRssChange.bind(this)}
                 onFormSubmit={this.onAddFormSubmit.bind(this)}
                 nameValid={newBlogNameValid}
                 nameDirty={newBlogNameDirty}
                 urlValid={newBlogUrlValid}
                 urlDirty={newBlogUrlDirty}
                 rssValid={newBlogRssValid}
                 rssDirty={newBlogRssDirty}
        />
        <BlogList blogList={blogList} blogListLoading={blogListLoading} onDeleteClick={this.onDeleteClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />
        <Message type="alert" message={errorMessage} isVisible={blogListError}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Add));
