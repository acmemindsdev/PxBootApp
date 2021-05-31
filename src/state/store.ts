import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import mediaReducer from './media/mediaReducer';
import patientReducer from './patient/patientReducer';
import hospitalReducer from './hospital/hospitalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  media: mediaReducer,
  patient: patientReducer,
  hospital: hospitalReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
