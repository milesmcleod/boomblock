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
    const source = this.state.audioContext.createBufferSource();
    let typeBuffer;
    this.state.audioContext.decodeAudioData(
      newProps[`${type}ArrayBuffer`],
      (buffer) => {
        typeBuffer = buffer;
        source.buffer = typeBuffer;
        const gain = this.state.audioContext.createGain();
        source.connect(gain);
        const analyser = this.state.audioContext.createAnalyser();
        gain.connect(analyser);
        analyser.connect(this.state.masterGain);
        this.setState({
          [`${type}Source`]: source,
          [`${type}Gain`]: gain,
          [`${type}Analyser`]: analyser
        });
        console.log(`loaded ${type}`);
      }
    );
  }

  componentWillReceiveProps (newProps) {
    if (
      newProps.drumsArrayBuffer &&
      newProps.bassArrayBuffer &&
      newProps.melodyArrayBuffer &&
      newProps.samplesArrayBuffer
    ) {
      this.routeTrack('drums', newProps);
      this.routeTrack('bass', newProps);
      this.routeTrack('melody', newProps);
      this.routeTrack('samples', newProps);
      this.state.masterGain.connect(this.state.audioContext.destination);
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
