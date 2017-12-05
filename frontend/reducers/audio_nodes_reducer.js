// root_reducer.js
import merge from 'lodash/merge';
import {
  RECEIVE_BASS_PATH,
  RECEIVE_DRUMS_PATH,
  RECEIVE_MELODY_PATH,
  RECEIVE_SAMPLES_PATH,
  RECEIVE_MASTER_NODES
} from '../actions/web_audio_actions';

const defaultState = {
  bass: {
    sourceNode: undefined,
    gainNode: undefined,
    analyserNode: undefined
  },
  drums: {
    sourceNode: undefined,
    gainNode: undefined,
    analyserNode: undefined
  },
  melody: {
    sourceNode: undefined,
    gainNode: undefined,
    analyserNode: undefined
  },
  samples: {
    sourceNode: undefined,
    gainNode: undefined,
    analyserNode: undefined
  },
  master: {
    gainNode: undefined,
    audioContext: undefined
  }
};

const TracksApiDataReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case RECEIVE_BASS_PATH:
      nextState = merge({}, state);
      nextState['bass']['sourceNode'] = action.sourceNode;
      nextState['bass']['gainNode'] = action.gainNode;
      nextState['bass']['analyserNode'] = action.analyserNode;
      return nextState;
    case RECEIVE_DRUMS_PATH:
      nextState = merge({}, state);
      nextState['drums']['sourceNode'] = action.sourceNode;
      nextState['drums']['gainNode'] = action.gainNode;
      nextState['drums']['analyserNode'] = action.analyserNode;
      return nextState;
    case RECEIVE_MELODY_PATH:
      nextState = merge({}, state);
      nextState['melody']['sourceNode'] = action.sourceNode;
      nextState['melody']['gainNode'] = action.gainNode;
      nextState['melody']['analyserNode'] = action.analyserNode;
      return nextState;
    case RECEIVE_SAMPLES_PATH:
      nextState = merge({}, state);
      nextState['samples']['sourceNode'] = action.sourceNode;
      nextState['samples']['gainNode'] = action.gainNode;
      nextState['samples']['analyserNode'] = action.analyserNode;
      return nextState;
    case RECEIVE_MASTER_NODES:
      nextState = merge({}, state);
      nextState['master']['gainNode'] = action.gainNode;
      nextState['master']['audioContext'] = action.audioContext;
      return nextState;
    default:
      return state;
  }
};

export default TracksApiDataReducer;
