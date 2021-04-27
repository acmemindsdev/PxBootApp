import { createStore, combineReducers } from 'redux';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
