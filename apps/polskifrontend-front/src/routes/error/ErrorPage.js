import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ErrorPage.styl';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    if (__DEV__) { // eslint-disable-line no-undef
      const { error } = this.props;
      return (
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(style)(ErrorPage);
