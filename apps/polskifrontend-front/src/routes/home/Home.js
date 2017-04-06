import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';
import BlogList from './parts/BlogList';
import TopHomePanel from './parts/TopHomePanel';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

class Home extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    homeState: PropTypes.object
  };

  componentDidMount() {
    const { actions: { getBlogList } } = this.props;
    getBlogList();
  }

  onBlogProposalUrlChange(event) {
    event.preventDefault();

    const { actions: { blogProposalChange } } = this.props;
    blogProposalChange(event.target.value);
  }

  render() {
    let { homeState: { blogList, blogListLoading } } = this.props;
    blogList = blogList || [];

    return (
      <div className={style.container}>
        <TopHomePanel />
        <BlogList blogList={blogList} blogListLoading={blogListLoading} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));
