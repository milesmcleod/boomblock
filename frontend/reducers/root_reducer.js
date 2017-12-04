// root_reducer.js
import { combineReducers } from 'redux';
import reducer from './default_reducer.js';

const rootReducer = combineReducers({
  default: reducer
});

export default rootReducer;
