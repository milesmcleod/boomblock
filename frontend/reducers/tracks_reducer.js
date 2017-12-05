// root_reducer.js
import merge from 'lodash/merge';
import {
  RECEIVE_BASS_TRACK,
  RECEIVE_DRUMS_TRACK,
  RECEIVE_MELODY_TRACK,
  RECEIVE_SAMPLES_TRACK
} from '../actions/tracks_actions';

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case RECEIVE_BASS_TRACK:
      nextState = merge({}, state);
      nextState['bassArrayBuffer'] = action.arraybuffer;
      return nextState;
    case RECEIVE_DRUMS_TRACK:
      nextState = merge({}, state);
      nextState['drumsArrayBuffer'] = action.arraybuffer;
      return nextState;
    case RECEIVE_MELODY_TRACK:
      nextState = merge({}, state);
      nextState['melodyArrayBuffer'] = action.arraybuffer;
      return nextState;
    case RECEIVE_SAMPLES_TRACK:
      nextState = merge({}, state);
      nextState['samplesArrayBuffer'] = action.arraybuffer;
      return nextState;
    default:
      return state;
  }
};

export default TracksReducer;
