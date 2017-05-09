import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ErrorPage.styl';
import HeaderSettings from '../../components/Layout/HeaderSettings';

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

    const { description, title, context } = this.props;

    return (
      <div>
        <HeaderSettings description={description} title={title} currentPath={context.path}/>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(style)(ErrorPage);
