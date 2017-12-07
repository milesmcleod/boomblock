// this is my attempt at creating a tempo analyser in JS, based
// on the approach outlined by Joe Sullivan at
// http://joesul.li/van/beat-detection-using-web-audio/

class BeatAnalyser {
  constructor(drumsBuffer) {
    this.data = drumsBuffer.getChannelData(0);
    this.duration = drumsBuffer.duration;
    this.threshold = 0.15;
    this.dataLength = this.data.length;
    this.increment = this.dataLength/(this.duration * 1000); // in floats/ms
    this.peaksArray = [];
    this.intervalHash = {};
  }

  getPeaksAboveThreshold(data, threshold) {
    
  }
}

/*

variables I need

-the buffer length in milliseconds
duration = drumsBuffer.duration;

-length of Float32Array of PCM data
dataLength = audio.drumsBuffer.getChannelData(0).length;

-an arbitrary threshold
try 0.15 to start

-the length of an arbitrary interval in milliseconds by which I will
iterate through the buffer and take the peak value from the Float32Array

dataLength/duration = floats/second; * second/1000 ms = floats/millisecond

increment = dataLength/(duration * 1000); this is in float/ms

peaksArray = array of dataLength indices where PCM value is above threshold

intervalHash: a counter hash where each key represents an interval in
milliseconds, and the value at that key represents the number of times
that interval occurs between adjacent values in the peaksArray



*/
