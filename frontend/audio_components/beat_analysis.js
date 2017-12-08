// this is my attempt at creating a tempo analyser in JS, based
// on the approach outlined by Joe Sullivan at
// http://joesul.li/van/beat-detection-using-web-audio/

class BeatAnalyser {
  constructor(drumsBuffer) {
    this.data = drumsBuffer.getChannelData(0);
    this.duration = drumsBuffer.duration;
    this.threshold = undefined;
    this.dataLength = this.data.length;
    this.increment = Math.round(this.dataLength/(this.duration * 1000)); // in floats/ms
    this.peaksArray = [];
    this.intervalCounterHash = {};
    this.mostCommonInterval = 0;
    this.mostCommonIntervalCount = 0;
    this.generateThreshold();
    this.run();
  }

  generateThreshold() {
    this.largestFloat = 0;
    for (let i = 0; i < this.dataLength; i += this.increment) {
      if (Math.abs(this.data[i]) > this.largestFloat) {
        this.largestFloat = this.data[i];
      }
    }
    this.threshold = this.largestFloat;
  }

  generatePeaks() {
    for (let i = 0; i < this.dataLength; i += this.increment) {
      if (Math.abs(this.data[i]) > this.threshold) {
        this.peaksArray.push(i);
      }
    }
  }

  generateIntervalHash() {
    for (let i = 0; i < this.peaksArray.length - 1; i++) {
      const interval = this.peaksArray[i + 1] - this.peaksArray[i];
      if (this.intervalCounterHash[interval]) {
        this.intervalCounterHash[interval] += 1;
      } else {
        this.intervalCounterHash[interval] = 1;
      }
    }
    this.intervalCounterHash[this.increment] = 0;
  }

  generateMostCommonInterval() {
    const intervals = Object.keys(this.intervalCounterHash);
    intervals.forEach(interval => {
      if (this.intervalCounterHash[interval] > this.mostCommonIntervalCount) {
        this.mostCommonIntervalCount = this.intervalCounterHash[interval];
        this.mostCommonInterval = interval;
      }
    });
  }

  run() {
    this.generatePeaks();
    if (this.peaksArray.length < 300) {
      this.threshold -= 0.005;
      this.run();
    } else {
      this.generateIntervalHash();
      this.generateMostCommonInterval();
    }
  }

  getIntervalInMilliseconds() {
    const tempo = this.mostCommonInterval/this.increment;
    const bpm = Math.round((1/tempo) * 60 * 1000 * 2);
    return (60*1000*4/(bpm)); //gives beats in ms
  }
}

export default BeatAnalyser;

/*

variables I need

-the buffer length in milliseconds
duration = drumsBuffer.duration;

-length of Float32Array of PCM data
dataLength = audio.drumsBuffer.getChannelData(0).length;

-a threshold

-the length of an arbitrary interval in milliseconds by which I will
iterate through the buffer and take the peak value from the Float32Array

dataLength/duration = floats/second; * second/1000 ms = floats/millisecond

increment = dataLength/(duration * 1000); this is in float/ms

peaksArray = array of dataLength indices where PCM value is above threshold

intervalHash: a counter hash where each key represents an interval in
milliseconds, and the value at that key represents the number of times
that interval occurs between adjacent values in the peaksArray



*/
