import { connect } from 'react-redux';
import { getTrack } from '../actions/tracks_api_actions';
import {
  sendAudioPathToStore,
  sendMasterNodesToStore
 } from '../actions/web_audio_actions';
import AudioTracks from './audio_tracks';

const mapStateToProps = (state) => {
  return {
    drumsArrayBuffer: state.tracks.drumsArrayBuffer,
    bassArrayBuffer: state.tracks.bassArrayBuffer,
    melodyArrayBuffer: state.tracks.melodyArrayBuffer,
    samplesArrayBuffer: state.tracks.samplesArrayBuffer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendAudioPathToStore: (
      type,
      sourceNode,
      gainNode,
      analyserNode
    ) => dispatch(sendAudioPathToStore(
        type,
        sourceNode,
        gainNode,
        analyserNode
    )),
    sendMasterNodesToStore: (masterGain, audioContext) => dispatch(sendMasterNodesToStore(
      masterGain,
      audioContext
    )),
    getDrums: () => dispatch(getTrack(
      'drums',
      "https://s3-us-west-1.amazonaws.com/boomblock/the_lux_2_drums.mp3"
    )),
    getBass: () => dispatch(getTrack(
      'bass',
      "https://s3-us-west-1.amazonaws.com/boomblock/the_lux_2_bass.mp3"
    )),
    getMelody: () => dispatch(getTrack(
      'melody',
      "https://s3-us-west-1.amazonaws.com/boomblock/the_lux_2_melody.mp3"
    )),
    getSamples: () => dispatch(getTrack(
      'samples',
      "https://s3-us-west-1.amazonaws.com/boomblock/the_lux_2_samples.mp3"
    ))
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(AudioTracks);
