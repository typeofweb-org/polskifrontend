import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReducer from './login';
import adminReducer from './admin';
import submitReducer from './submit';
import feedbackReducer from './feedback';

export default combineReducers({
  homeState: homeReducer,
  loginState: loginReducer,
  adminState: adminReducer,
  submitState: submitReducer,
  feedbackState: feedbackReducer
});
