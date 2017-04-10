import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Admin.styl';
import { connect } from 'react-redux';
import history from '../../core/history';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import AddBlog from './parts/AddBlog';
import BlogList from './parts/BlogList';
import Message from '../../components/Indicators/Message';
import Confirm from '../../components/Modals/Confirm';

class Admin extends React.Component {
  componentDidMount() {
    const { actions: { getAdminBlogList } } = this.props;
    getAdminBlogList();
  }

  componentDidUpdate() {
    const { actions: { resetAdminState }, adminState: { tokenExpired } } = this.props;

    if (tokenExpired) {
      // reset token expired
      resetAdminState();

      // redirect to login
      history.push('/login');
    }
  }

  onDeleteClick(id, event) {
    event.preventDefault();
    const { actions: { deleteBlogRequest } } = this.props;
    deleteBlogRequest(id);
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

    if (newBlogNameValid && newBlogUrlValid && newBlogRssValid) {
      addBlog({ name: newBlogName, href: newBlogUrl, rss: newBlogRss });
    }
  }

  onDeleteCancelClick() {
    const { actions: { deleteBlogRequestCancel } } = this.props;
    deleteBlogRequestCancel();
  }

  onDeleteConfirmClick() {
    const { actions: { deleteBlog }, adminState: { deleteBlogId } } = this.props;
    deleteBlog(deleteBlogId);
  }

  onRefreshClick(id, event) {
    event.preventDefault();
    const { actions: { refreshBlog } } = this.props;
    refreshBlog(id);
  }

  render() {
    const { adminState: {
      blogList,
      blogListLoading,
      blogListError,
      newBlogName,
      newBlogUrl,
      newBlogRss,
      newBlogNameValid,
      newBlogNameDirty,
      newBlogUrlValid,
      newBlogUrlDirty,
      newBlogRssValid,
      newBlogRssDirty,
      addBlogLoading,
      addBlogError,
      addBlogErrorMessage,
      deleteBlogRequested,
      refreshBlogLoading
    } } = this.props;
    let errorMessage = blogListError ? 'Błąd pobierania blogów - spróbuj odświezyć stronę' : '';
    const shouldCleanUp = newBlogName === '' && newBlogUrl === '' && newBlogRss === '';

    if (blogListError === false && addBlogError) {
      errorMessage = addBlogErrorMessage;
    }

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
                 shouldCleanUp={shouldCleanUp}
                 addBlogLoading={addBlogLoading}
        />
        <BlogList blogList={blogList}
                  blogListLoading={blogListLoading}
                  onDeleteClick={this.onDeleteClick.bind(this)}
                  onEditClick={this.onEditClick.bind(this)}
                  onRefreshClick={this.onRefreshClick.bind(this)}
                  refreshLoading={refreshBlogLoading}
        />
        <Confirm question="Czy jesteś pewien, że chcesz usunąć bloga?" isVisible={deleteBlogRequested} onCancelClick={this.onDeleteCancelClick.bind(this)} onConfirmClick={this.onDeleteConfirmClick.bind(this)} />
        <Message type="alert" message={errorMessage} isVisible={blogListError || addBlogError} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Admin));
