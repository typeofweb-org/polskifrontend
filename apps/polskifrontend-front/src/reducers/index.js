import { combineReducers } from 'redux';
import homeReducer from './home';
import loginReduxer from './login';

export default combineReducers({
  homeState: homeReducer,
  loginState: loginReduxer
});
