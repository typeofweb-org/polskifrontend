import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';
import BlogList from './parts/BlogList';
import BlogProposalForm from './parts/BlogProposalForm';

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
  }

  render() {
    let { homeState: { blogList } } = this.props;
    blogList = blogList || [];

    return (
      <div className={style.container}>
        <BlogProposalForm onUrlChange={this.onBlogProposalUrlChange.bind(this)}/>
        <BlogList blogList={blogList}/>
      </div>
    );
  }
}

export default withStyles(style)(Home);
