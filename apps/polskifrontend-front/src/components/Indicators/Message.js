import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Message.styl';

class Message extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['alert', 'message', 'info']).isRequired,
    message: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isMessageVisible: false };
    this.currentTimout = null;
  }

  componentDidMount() {
    if (this.props.isVisible) {
      this.setState({
        isMessageVisible: this.props.isVisible
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isMessageVisible } = this.state;
    const { isVisible } = this.props;

    if (this.currentTimout) {
      clearTimeout(this.currentTimout);
    }

    if (prevProps.isVisible !== isVisible) {
      this.setState({
        isMessageVisible: isVisible
      });
    }

    if (prevState.isMessageVisible === false && isMessageVisible) {
      this.currentTimout = setTimeout(() => {
        this.setState({
          isMessageVisible: false
        });
      }, 6000);
    }
  }

  render() {
    const { type, message } = this.props;
    let classNames = style.container;

    switch(type) {
      case 'alert':
        classNames = `${style.container} ${style['container--alert']}`;
        break;
      case 'message':
        classNames = `${style.container} ${style['container--message']}`;
        break;
      case 'info':
        classNames = `${style.container} ${style['container--info']}`;
        break;
    }

    if (this.state.isMessageVisible) {
      classNames = `${classNames} ${style['container--visible']}`;
    }

    return (
      <div className={classNames}>
        {message}
      </div>
    );
  }
}

export default withStyles(style)(Message);
