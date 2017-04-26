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
  componentDidUpdate() {
    const { adminState: { tokenExpired } } = this.props;

    if (tokenExpired) {
      // redirect to login
      history.push('/login');
    }
  }

  onTitleChange() {

  }

  onMessageChange() {

  }

  onFormSubmit() {

  }

  render () {
    return (
      <div className={styles.container}>
        <AddNews onTitleChange={this.onTitleChange.bind(this)}
                 onMessageChange={this.onMessageChange.bind(this)}
                 onFormSubmit={this.onFormSubmit.bind(this)}
                 titleValid={true}
                 titleDirty={true}
                 messageValid={true}
                 messageDirty={true}
                 shouldCleanUp={false}
                 isLoading={false}
        />
        <NewsList />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(News));
