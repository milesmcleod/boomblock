// root_reducer.js
import { combineReducers } from 'redux';
import TracksReducer from './tracks_reducer.js';

const rootReducer = combineReducers({
  tracks: TracksReducer
});

export default rootReducer;
