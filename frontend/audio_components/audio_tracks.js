class AudioTracks {
  constructor() {
    this.arrayBufferCollection = {
      drumsArrayBuffer: undefined,
      samplesArrayBuffer: undefined,
      bassArrayBuffer: undefined,
      melodyArrayBuffer: undefined
    };

    this.drumsBuffer = undefined;
    this.drumsSource = undefined;
    this.drumsGain = undefined;
    this.drumsAnalyser = undefined;

    this.bassBuffer = undefined;
    this.bassSource = undefined;
    this.bassGain = undefined;
    this.bassAnalyser = undefined;

    this.melodyBuffer = undefined;
    this.melodySource = undefined;
    this.melodyGain = undefined;
    this.melodyAnalyser = undefined;
    this.melodyBufferLength = undefined;
    // length: 128
    this.melodyDataArray = undefined;

    this.samplesBuffer = undefined;
    this.samplesSource = undefined;
    this.samplesGain = undefined;
    this.samplesAnalyser = undefined;

    this.audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();

    this.masterGain = this.audioContext.createGain();
    this.masterAnalyser = this.audioContext.createAnalyser();
    this.masterGain.connect(this.masterAnalyser);
    this.masterAnalyser.connect(this.audioContext.destination);

    this.masterAnalyser.fftSize = 256;
    const bufferLength = this.masterAnalyser.frequencyBinCount;
    // length: 128
    this.masterDataArray = new Uint8Array(bufferLength);

    this.loaded = 0;
    this.playing = 0;
    this.startedAt = 0;
    this.pausedAt = 0;
  }

  load() {
    const getDrums = this.getTrack(
      "https://s3-us-west-1.amazonaws.com/boomblock/lux_2_drums.mp3"
    );
    const getBass = this.getTrack(
      "https://s3-us-west-1.amazonaws.com/boomblock/lux_2_bass.mp3"
    );
    const getSamples = this.getTrack(
      "https://s3-us-west-1.amazonaws.com/boomblock/lux_2_samples.mp3"
    );
    const getMelody = this.getTrack(
      "https://s3-us-west-1.amazonaws.com/boomblock/lux_2_melody.mp3"
    );
    Promise.all([
      getDrums,
      getBass,
      getSamples,
      getMelody
    ]).then((results) => {
      ['drums', 'bass', 'samples', 'melody'].forEach((type, idx) => {
        this.arrayBufferCollection[`${type}ArrayBuffer`] = results[idx];
      });
    }).then(() => {
      this.routeTrack('drums', this.arrayBufferCollection);
      this.routeTrack('bass', this.arrayBufferCollection);
      this.routeTrack('samples', this.arrayBufferCollection);
      this.routeTrack('melody', this.arrayBufferCollection);
    });
  }

  getTrack (url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
        else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.send();
    });
  }


  routeTrack(type, arrayBufferCollection) {
    const sourceNode = this.audioContext.createBufferSource();
    let typeBuffer;
    this.audioContext.decodeAudioData(
      arrayBufferCollection[`${type}ArrayBuffer`].slice(),
      (buffer) => {
        typeBuffer = buffer;
        sourceNode.buffer = typeBuffer;
        const gainNode = this.audioContext.createGain();
        sourceNode.connect(gainNode);
        const analyserNode = this.audioContext.createAnalyser();
        gainNode.connect(analyserNode);
        analyserNode.connect(this.masterGain);
        this[`${type}Buffer`] = typeBuffer;
        this[`${type}Source`] = sourceNode;
        this[`${type}Gain`] = gainNode;
        this[`${type}Analyser`] = analyserNode;
        this[`${type}Analyser`].fftSize = 16384;
        this[`${type}BufferLength`] = this[`${type}Analyser`].frequencyBinCount;
        // length: 128
        this[`${type}DataArray`] = new Float32Array(this[`${type}BufferLength`]);
        this.loaded += 0.25;
      }
    );
  }

  resetTrack(type, buffer) {
    const sourceNode = this.audioContext.createBufferSource();
    let typeBuffer = buffer;
      sourceNode.buffer = typeBuffer;
      const gainNode = this.audioContext.createGain();
      sourceNode.connect(gainNode);
      const analyserNode = this.audioContext.createAnalyser();
      gainNode.connect(analyserNode);
      analyserNode.connect(this.masterGain);
      this[`${type}Buffer`] = typeBuffer;
      this[`${type}Source`] = sourceNode;
      this[`${type}Gain`] = gainNode;
      this[`${type}Analyser`] = analyserNode;
      this[`${type}Analyser`].fftSize = 16384;
      this[`${type}BufferLength`] = this[`${type}Analyser`].frequencyBinCount;
      // length: 128
      this[`${type}DataArray`] = new Float32Array(this[`${type}BufferLength`]);
      this.loaded += 0.25;
  }

  start() {
    this.playing = 1;
    if (this.pausedAt) {
      this.startedAt = Date.now() - this.pausedAt;
      this.drumsSource.start(0, this.pausedAt / 1000);
      this.bassSource.start(0, this.pausedAt / 1000);
      this.melodySource.start(0, this.pausedAt / 1000);
      this.samplesSource.start(0, this.pausedAt / 1000);
    } else {
      this.startedAt = Date.now();
      this.drumsSource.start(0);
      this.bassSource.start(0);
      this.melodySource.start(0);
      this.samplesSource.start(0);
    }
  }

  stop() {
    this.playing = 0;
    this.pausedAt = Date.now() - this.startedAt;
    this.drumsSource.stop();
    this.bassSource.stop();
    this.melodySource.stop();
    this.samplesSource.stop();
  }

  reload() {
    this.loaded = 0;
    this.resetTrack('drums', this.drumsBuffer);
    this.resetTrack('bass', this.bassBuffer);
    this.resetTrack('samples', this.samplesBuffer);
    this.resetTrack('melody', this.melodyBuffer);
  }
}

export default AudioTracks;
