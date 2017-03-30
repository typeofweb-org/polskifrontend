import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NotFound.styl';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    );
  }
}

export default withStyles(style)(NotFound);
