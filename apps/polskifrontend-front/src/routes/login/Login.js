import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Login.styl';
import LoginForm from './parts/LoginForm';

class Login extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <LoginForm />
      </div>
    );
  }
}

export default withStyles(style)(Login);
