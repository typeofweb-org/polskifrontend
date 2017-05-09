import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Articles.styl';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import { decode } from 'he';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class Articles extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    const { actions: { articlesClearDataLoaded } } = this.props;
    articlesClearDataLoaded();
  }

  render() {
    const { articlesState: { article }, context } = this.props;
    const title = `${article.title} | Polski Front-End`;
    const description = article.description ? decode(article.description.replace(/(<([^>]+)>)/ig, '')).substr(0, 140) + '...' : '';

    console.log(context);
    return (
      <div className={styles.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        Articles
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Articles));
