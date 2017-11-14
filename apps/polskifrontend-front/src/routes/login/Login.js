import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Login.styl';
import LoginForm from './parts/LoginForm';
import history from '../../core/history';
import * as loginHelper from '../../core/helpers/loginHelper';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import Message from '../../components/Indicators/Message';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class Login extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    adminState: PropTypes.object.isRequired,
    context: PropTypes.object,
    description: PropTypes.string.isRequired,
    loginState: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  onUserChange(event) {
    event.preventDefault();

    const { actions: { userChange } } = this.props;
    userChange(event.target.value);
  }

  onPasswordChange(event) {
    event.preventDefault();

    const { actions: { passwordChange } } = this.props;
    passwordChange(event.target.value);
  }

  onLoginClick(event) {
    event.preventDefault();

    const { actions: { login }, loginState: { userName, password } } = this.props;
    if (userName !== '' && password !== '') {
      login(userName, password);
    }
  }

  componentDidUpdate() {
    const { adminState: { tokenExpired } } = this.props;
    const token = loginHelper.getLoginToken();

    if (tokenExpired === false && token && token.length > 0) {
      history.push('/admin');
    }
  }

  render() {
    const { loginState: { buttonDisabled, loginError } } = this.props;
    const { context, description, title } = this.props;
    const errorMessage = loginError ? 'Logowanie nie udane - spóbuj ponownie' : '';

    return (
      <div className={style.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        <LoginForm onUserChange={this.onUserChange.bind(this)}
                   onPasswordChange={this.onPasswordChange.bind(this)}
                   onLoginClick={this.onLoginClick.bind(this)}
                   buttonDisabled={buttonDisabled}
        />
        <Message type="alert" message={errorMessage} isVisible={loginError}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));
