import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './News.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import NewsList from './parts/NewsList';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class News extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    newsState: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

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
        <HeaderSettings currentPath={context.path} description={description} title={title} />
        <NewsList isLoadingMore={newsListLoading}
                  newsList={newsList}
                  nextPage={newsListNextPage}
                  onScrolledBottom={this.onScrolledBottom.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(News));
