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

class Home extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    homeState: PropTypes.object
  };

  onListOptionClick(event) {
    event.preventDefault();

    const { actions: { switchToListView } } = this.props;
    switchToListView();
  }

  onTilesOptionClick(event) {
    event.preventDefault();

    const { actions: { getBlogList } } = this.props;
    getBlogList();
  }

  render() {
    const { homeState: {
      blogList,
      blogListLoading,
      isTilesOptionSelected,
      isListOptionSelected,
      allArticlesList,
      allArticlesListLoading
    } } = this.props;

    return (
      <div className={style.container}>
        <TopHomePanel />
        <BlogListControlPanel isTilesOptionSelected={isTilesOptionSelected}
                              isListOptionSelected={isListOptionSelected}
                              onTilesOptionClick={this.onTilesOptionClick.bind(this)}
                              onListOptionClick={this.onListOptionClick.bind(this)}
                              isLoading={blogListLoading || allArticlesListLoading}
        />
        {isTilesOptionSelected ?
          <BlogTiles blogList={blogList || []} blogListLoading={blogListLoading}/> :
          <BlogList articles={allArticlesList || []} isLoading={allArticlesListLoading}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));
