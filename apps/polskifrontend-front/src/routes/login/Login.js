import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Login.styl';
import LoginForm from './parts/LoginForm';

class Login extends React.Component {
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
  }

  render() {
    const { loginState: { buttonDisabled } } = this.props;

    return (
      <div className={style.container}>
        <LoginForm onUserChange={this.onUserChange.bind(this)}
                   onPasswordChange={this.onPasswordChange.bind(this)}
                   onLoginClick={this.onLoginClick.bind(this)}
                   buttonDisabled={buttonDisabled}
        />
      </div>
    );
  }
}

export default withStyles(style)(Login);
