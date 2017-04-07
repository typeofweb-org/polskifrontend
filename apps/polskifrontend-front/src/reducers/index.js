import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReducer from './login';
import adminReducer from './admin';
import submitReducer from './submit';

export default combineReducers({
  homeState: homeReducer,
  loginState: loginReducer,
  adminState: adminReducer,
  submitState: submitReducer
});
