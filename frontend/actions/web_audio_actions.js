export const RECEIVE_BASS_PATH = 'RECEIVE_BASS_PATH';
export const RECEIVE_DRUMS_PATH = 'RECEIVE_DRUMS_PATH';
export const RECEIVE_SAMPLES_PATH = 'RECEIVE_SAMPLES_PATH';
export const RECEIVE_MELODY_PATH = 'RECEIVE_MELODY_PATH';
export const RECEIVE_MASTER_NODES = 'RECEIVE_MASTER_NODES';

export const sendAudioPathToStore = (
  type,
  sourceNode,
  gainNode,
  analyserNode
) => {
  let actionType;
  switch (type) {
    case 'drums':
      actionType = RECEIVE_DRUMS_PATH;
      break;
    case 'bass':
      actionType = RECEIVE_BASS_PATH;
      break;
    case 'samples':
      actionType = RECEIVE_SAMPLES_PATH;
      break;
    case 'melody':
      actionType = RECEIVE_MELODY_PATH;
      break;
  }
  return {
    type: actionType,
    sourceNode,
    gainNode,
    analyserNode
  };
};

export const sendMasterNodesToStore = (gainNode, audioContext) => ({
  type: RECEIVE_MASTER_NODES,
  gainNode,
  audioContext
});
