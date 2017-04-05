import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Login.styl';
import LoginForm from './parts/LoginForm';
import history from '../../core/history';
import * as loginHelper from '../../core/helpers/loginHelper';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';
import Message from '../../components/Indicators/Message';

class Login extends React.Component {
  static propTypes = {
    routing: PropTypes.object
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

  componentDidMount() {
    loginHelper.clearLoginToken();
  }

  componentDidUpdate() {
    if (loginHelper.getLoginToken()) {
      history.push('/admin');
    }
  }

  render() {
    const { loginState: { buttonDisabled, loginError } } = this.props;
    const errorMessage = loginError ? 'Logowanie nie udane - spóbuj ponownie' : '';

    return (
      <div className={style.container}>
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
