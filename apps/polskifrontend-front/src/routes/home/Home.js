import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';
import BlogTiles from './parts/BlogTiles';
import BlogList from './parts/BlogList';
import TopHomePanel from './parts/TopHomePanel';
import BlogListControlPanel from './parts/BlogListControlPanel';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import Message from '../../components/Indicators/Message';
import CookieInfo from '../../components/Cookie/CookieInfo';

class Home extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    homeState: PropTypes.object
  };

  onListOptionClick(event) {
    event.preventDefault();

    const { actions: { switchToListView } } = this.props;
    switchToListView(1);
  }

  onTilesOptionClick(event) {
    event.preventDefault();

    const { actions: { getBlogList } } = this.props;
    getBlogList(1);
  }

  onAllListScrolledBottom() {
    const { actions: { switchToListView }, homeState: { allArticlesNextPage, allArticlesListLoading } } = this.props;
    if (allArticlesListLoading === false && allArticlesNextPage > 1) {
      switchToListView(allArticlesNextPage);
    }
  }

  onBlogListScrolledBottom() {
    const { actions: { getBlogList }, homeState: { blogListNextPage, blogListLoading } } = this.props;
    if (blogListLoading === false && blogListNextPage > 1) {
      getBlogList(blogListNextPage);
    }
  }

  render() {
    const { homeState: {
      blogList,
      blogListLoading,
      blogListError,
      blogListNextPage,
      articlesError,
      isTilesOptionSelected,
      isListOptionSelected,
      allArticlesList,
      allArticlesListLoading,
      allArticlesNextPage,
      allArticlesListError
    } } = this.props;

    return (
      <div className={style.container}>
        <div className={style.pusher}>
        </div>
        <TopHomePanel />
        <BlogListControlPanel isTilesOptionSelected={isTilesOptionSelected}
                              isListOptionSelected={isListOptionSelected}
                              onTilesOptionClick={this.onTilesOptionClick.bind(this)}
                              onListOptionClick={this.onListOptionClick.bind(this)}
                              isLoading={blogListLoading || allArticlesListLoading}
        />
        {isTilesOptionSelected ?
          <BlogTiles blogList={blogList || []}
                     blogListLoading={blogListLoading && blogListNextPage === 1}
                     nextPage={blogListNextPage}
                     isLoadingMore={blogListLoading && blogListNextPage > 1}
                     onScrolledBottom={this.onBlogListScrolledBottom.bind(this)}
          /> :
          <BlogList articles={allArticlesList || []}
                    isLoading={allArticlesListLoading && allArticlesNextPage === 1}
                    isLoadingMore={allArticlesListLoading && allArticlesNextPage > 1}
                    onScrolledBottom={this.onAllListScrolledBottom.bind(this)}
                    nextPage={allArticlesNextPage}
          />}
        <Message type="alert"
                 message="Błąd pobierania danych. Spróbuj ponownie!"
                 isVisible={blogListError || articlesError || allArticlesListError} />
        <CookieInfo />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));
