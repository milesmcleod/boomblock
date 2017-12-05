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

  routeDrums(newProps) {
    const drumsSource = this.state.audioContext.createBufferSource();
    let drumsBuffer;
    this.state.audioContext.decodeAudioData(
      newProps.drumsArrayBuffer,
      (buffer) => {
        drumsBuffer = buffer;
        drumsSource.buffer = drumsBuffer;
        const drumsGain = this.state.audioContext.createGain();
        drumsSource.connect(drumsGain);
        const drumsAnalyser = this.state.audioContext.createAnalyser();
        drumsGain.connect(drumsAnalyser);
        drumsAnalyser.connect(this.state.masterGain);
        this.setState({
          drumsSource,
          drumsGain,
          drumsAnalyser
        });
        console.log('loaded drums');
      }
    );
  }

  routeBass(newProps) {
    const bassSource = this.state.audioContext.createBufferSource();
    let bassBuffer;
    this.state.audioContext.decodeAudioData(
      newProps.bassArrayBuffer,
      (buffer) => {
        bassBuffer = buffer;
        bassSource.buffer = bassBuffer;
        const bassGain = this.state.audioContext.createGain();
        bassSource.connect(bassGain);
        const bassAnalyser = this.state.audioContext.createAnalyser();
        bassGain.connect(bassAnalyser);
        bassAnalyser.connect(this.state.masterGain);
        this.setState({
          bassSource,
          bassGain,
          bassAnalyser
        });
        console.log('loaded bass');
      }
    );
  }

  routeMelody(newProps) {
    const melodySource = this.state.audioContext.createBufferSource();
    let melodyBuffer;
    this.state.audioContext.decodeAudioData(
      newProps.melodyArrayBuffer,
      (buffer) => {
        melodyBuffer = buffer;
        melodySource.buffer = melodyBuffer;
        const melodyGain = this.state.audioContext.createGain();
        melodySource.connect(melodyGain);
        const melodyAnalyser = this.state.audioContext.createAnalyser();
        melodyGain.connect(melodyAnalyser);
        melodyAnalyser.connect(this.state.masterGain);
        this.setState({
          melodySource,
          melodyGain,
          melodyAnalyser
        });
        console.log('loaded melody');
      }
    );
  }

  routeSamples(newProps) {
    const samplesSource = this.state.audioContext.createBufferSource();
    let samplesBuffer;
    this.state.audioContext.decodeAudioData(
      newProps.samplesArrayBuffer,
      (buffer) => {
        samplesBuffer = buffer;
        samplesSource.buffer = samplesBuffer;
        const samplesGain = this.state.audioContext.createGain();
        samplesSource.connect(samplesGain);
        const samplesAnalyser = this.state.audioContext.createAnalyser();
        samplesGain.connect(samplesAnalyser);
        samplesAnalyser.connect(this.state.masterGain);
        this.setState({
          samplesSource,
          samplesGain,
          samplesAnalyser
        });
        console.log('loaded samples');
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
      this.routeDrums(newProps);
      this.routeBass(newProps);
      this.routeMelody(newProps);
      this.routeSamples(newProps);
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
    }
    return (
      <div>

      </div>
    );
  }
}

export default AudioTracks;
