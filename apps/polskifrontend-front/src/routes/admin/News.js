import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './News.styl';
import { connect } from 'react-redux';
import history from '../../core/history';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import AddNews from './parts/AddNews';
import NewsList from './parts/NewsList';

class News extends React.Component {
  componentDidMount() {
    const { actions: { getAdminNewsList }, adminNewsState: { newsListLoading } } = this.props;
    if (newsListLoading) {
      getAdminNewsList();
    }
  }

  componentDidUpdate() {
    const { adminState: { tokenExpired } } = this.props;

    if (tokenExpired) {
      // redirect to login
      history.push('/login');
    }
  }

  onTitleChange(event) {
    event.preventDefault();

    const { actions: { newNewsTitleChanged } } = this.props;
    newNewsTitleChanged(event.currentTarget.value);
  }

  onMessageChange(event) {
    event.preventDefault();

    const { actions: { newNewsMessageChanged } } = this.props;
    newNewsMessageChanged(event.currentTarget.value);
  }

  onFormSubmit(event) {
    event.preventDefault();

    const {
      actions: {
        addNews
      },
      adminNewsState: {
        newTitle,
        newTitleValid,
        newMessage,
        newMessageValid
      } } = this.props;

    if (newTitleValid && newMessageValid) {
      addNews({ title: newTitle, message: newMessage });
    }
  }

  onDeleteClick() {

  }

  onEditClick() {

  }

  onRefreshClick() {

  }

  render () {
    const {
      adminNewsState: {
        newsList,
        newsListLoading,
        newTitle,
        newTitleValid,
        newTitleDirty,
        newMessage,
        newMessageValid,
        newMessageDirty
      }
    } = this.props;
    const shouldCleanUp = newTitle === '' && newMessage === '';

    return (
      <div className={styles.container}>
        <AddNews onTitleChange={this.onTitleChange.bind(this)}
                 onMessageChange={this.onMessageChange.bind(this)}
                 onFormSubmit={this.onFormSubmit.bind(this)}
                 titleValid={newTitleValid}
                 titleDirty={newTitleDirty}
                 messageValid={newMessageValid}
                 messageDirty={newMessageDirty}
                 shouldCleanUp={shouldCleanUp}
                 isLoading={false}
        />
        <NewsList newsList={newsList || []}
                  newsListLoading={newsListLoading}
                  onDeleteClick={this.onDeleteClick.bind(this)}
                  onEditClick={this.onEditClick.bind(this)}
                  onRefreshClick={this.onRefreshClick.bind(this)}
                  refreshLoading={false}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(News));
