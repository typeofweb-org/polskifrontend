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

class Add extends React.Component {
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
    } } = this.props;
    let errorMessage = blogListError ? 'Błąd pobierania blogów - spróbuj odświezyć stronę' : '';
    const shouldCleanUp = newBlogName === '' && newBlogUrl === '' && newBlogRss === '';

    if (blogListError === false && addBlogError) {
      errorMessage = 'Próba dodania bloga zakończona niepowodzeniem';
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
        <BlogList blogList={blogList} blogListLoading={blogListLoading} onDeleteClick={this.onDeleteClick.bind(this)} onEditClick={this.onEditClick.bind(this)} />
        <Message type="alert" message={errorMessage} isVisible={blogListError || addBlogError} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Add));
