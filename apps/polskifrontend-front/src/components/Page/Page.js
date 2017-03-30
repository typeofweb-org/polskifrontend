import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Page.styl';

class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired
  };

  render() {
    const { title, html } = this.props;
    return (
      <div className={style.root}>
        <div className={style.container}>
          <h1>{title}</h1>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Page);
