import React from 'react';

class AudioTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumsSource: undefined,
      drumsGain: undefined,
      drumsAnalyser: undefined,

      bassSource: undefined,
      bassGain: undefined,
      bassAnalyser: undefined,

      melodySource: undefined,
      melodyGain: undefined,
      melodyAnalyser: undefined,

      samplesSource: undefined,
      samplesGain: undefined,
      samplesAnalyser: undefined,

      audioContext: undefined,

      masterGain: undefined
    };
  }

  routeTrack(type, newProps) {
    const sourceNode = this.state.audioContext.createBufferSource();
    let typeBuffer;
    this.state.audioContext.decodeAudioData(
      newProps[`${type}ArrayBuffer`],
      (buffer) => {
        typeBuffer = buffer;
        sourceNode.buffer = typeBuffer;
        const gainNode = this.state.audioContext.createGain();
        sourceNode.connect(gainNode);
        const analyserNode = this.state.audioContext.createAnalyser();
        gainNode.connect(analyserNode);
        analyserNode.connect(this.state.masterGain);
        this.props.sendAudioPathToStore(
          type,
          sourceNode,
          gainNode,
          analyserNode
        );
        this.setState({
          [`${type}Source`]: sourceNode,
          [`${type}Gain`]: gainNode,
          [`${type}Analyser`]: analyserNode
        });
        console.log(`loaded ${type}`);
      }
    );
  }

  componentWillReceiveProps (newProps) {
    if (
      newProps.drumsArrayBuffer && !this.state.drumsSource &&
      newProps.bassArrayBuffer && !this.state.bassSource &&
      newProps.melodyArrayBuffer && !this.state.melodySource &&
      newProps.samplesArrayBuffer && !this.state.samplesSource
    ) {
      this.routeTrack('drums', newProps);
      this.routeTrack('bass', newProps);
      this.routeTrack('melody', newProps);
      this.routeTrack('samples', newProps);
      this.state.masterGain.connect(this.state.audioContext.destination);
      this.props.sendMasterNodesToStore(this.state.masterGain, this.state.audioContext);
    }
  }

  componentDidMount () {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = audioContext.createGain();
    this.setState({
      audioContext,
      masterGain
    });
    this.props.getDrums();
    this.props.getBass();
    this.props.getMelody();
    this.props.getSamples();
  }

  render () {
    if (
      this.state.drumsSource && this.state.bassSource &&
      this.state.melodySource && this.state.samplesSource
    ) {
      // this.state.drumsSource.start();
      // this.state.bassSource.start();
      // this.state.melodySource.start();
      // this.state.samplesSource.start();
      // window.setInterval(() => {
        // const data = new Float32Array(this.state.melodyAnalyser.frequencyBinCount);
        // this.state.melodyAnalyser.getFloatFrequencyData(data);
        // console.log(data);
        // this.state.drumsGain.gain.value = Math.random();
        // this.state.bassGain.gain.value = Math.random();
        // this.state.samplesGain.gain.value = Math.random();
        // this.state.melodyGain.gain.value = Math.random();
      // }, 1000);
    }
    return (
      <div>

      </div>
    );
  }
}

export default AudioTracks;
