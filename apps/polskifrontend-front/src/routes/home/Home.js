import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';
import BlogTiles from './parts/BlogTiles';
import BlogList from './parts/BlogList';
import BlogListControlPanel from './parts/BlogListControlPanel';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import Message from '../../components/Indicators/Message';
import * as settingsHelper from '../../core/helpers/settingsHelper';
import * as dateHelper from '../../core/helpers/dateHelper';

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

  onLinkClicked(url, isToday) {
    const { actions: { addLinkToClicked }, homeState: { clickedLinks } } = this.props;
    const link = clickedLinks.find(item => item === url);
    if (!link && isToday) {
      const settings = settingsHelper.getSettings();
      let clicked = settings.clickedLinks || [];

      // filter old clicked articles
      clicked = clicked.filter(item => {
        return dateHelper.isToday(item.date);
      });

      clicked.push({ url, date: Date.now() });
      settings.clickedLinks = clicked;
      settingsHelper.saveSettings(settings);

      addLinkToClicked({ url, date: Date.now() });
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
      allArticlesListError,
      clickedLinks
    } } = this.props;

    return (
      <div className={style.container}>
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
                     onArticleClicked={this.onLinkClicked.bind(this)}
                     clickedArticles={clickedLinks}
          /> :
          <BlogList articles={allArticlesList || []}
                    isLoading={allArticlesListLoading && allArticlesNextPage === 1}
                    isLoadingMore={allArticlesListLoading && allArticlesNextPage > 1}
                    onScrolledBottom={this.onAllListScrolledBottom.bind(this)}
                    nextPage={allArticlesNextPage}
                    onArticleClicked={this.onLinkClicked.bind(this)}
                    clickedArticles={clickedLinks}
          />}
        <Message type="alert"
                 message="Błąd pobierania danych. Spróbuj ponownie!"
                 isVisible={blogListError || articlesError || allArticlesListError} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));
