import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './News.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import NewsList from './parts/NewsList';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class News extends React.Component {
  onScrolledBottom() {
    const { actions: { getNewsPage }, newsState: { newsListNextPage, newsListLoading } } = this.props;
    if (newsListLoading === false && newsListNextPage > 1) {
      getNewsPage(newsListNextPage);
    }
  }

  render() {
    const { newsState: { newsList, newsListNextPage, newsListLoading } } = this.props;
    const { description, title, context } = this.props;
    return (
      <div className={styles.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        <NewsList newsList={newsList}
                  onScrolledBottom={this.onScrolledBottom.bind(this)}
                  isLoadingMore={newsListLoading}
                  nextPage={newsListNextPage}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(News));
