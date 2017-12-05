import * as APIUtil from '../util/api_util';

export const RECEIVE_DRUMS_TRACK = "RECEIVE_DRUMS_TRACK";
export const RECEIVE_BASS_TRACK = "RECEIVE_BASS_TRACK";
export const RECEIVE_MELODY_TRACK = "RECEIVE_MELODY_TRACK";
export const RECEIVE_SAMPLES_TRACK = "RECEIVE_SAMPLES_TRACK";

export const receiveDrumsTrack = (arraybuffer) => ({
  type: RECEIVE_DRUMS_TRACK,
  arraybuffer
});

export const receiveBassTrack = (arraybuffer) => ({
  type: RECEIVE_BASS_TRACK,
  arraybuffer
});

export const receiveMelodyTrack = (arraybuffer) => ({
  type: RECEIVE_MELODY_TRACK,
  arraybuffer
});

export const receiveSamplesTrack = (arraybuffer) => ({
  type: RECEIVE_SAMPLES_TRACK,
  arraybuffer
});

export const getTrack = (type, url) => (dispatch) => {
  const request = APIUtil.getTrack(url);
  request.onload = () => {
    switch (type) {
      case 'drums':
        dispatch(receiveDrumsTrack(request.response));
        break;
      case 'bass':
        dispatch(receiveBassTrack(request.response));
        break;
      case 'melody':
        dispatch(receiveMelodyTrack(request.response));
        break;
      case 'samples':
        dispatch(receiveSamplesTrack(request.response));
        break;
    }
  };
  request.send();
};
