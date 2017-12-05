// root_reducer.js
import { combineReducers } from 'redux';
import TracksApiDataReducer from './tracks_api_data_reducer';
import AudioNodesReducer from './audio_nodes_reducer';

const rootReducer = combineReducers({
  tracks: TracksApiDataReducer,
  audioNodes: AudioNodesReducer
});

export default rootReducer;
