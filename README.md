<h1 style="text-align:center;">BoomBlock: An Interactive Audio Visualizer</h1>

<p align="center">
  <img src="https://github.com/milesmcleod/boomblock/blob/master/assets/boomblock_demo.gif?raw=true"/>
</p>

## <h2 style="text-align:center;"> [BoomBlock 1.0 Live](https://milesmcleod.github.io/boomblock/)</h2>

----

## Summary

BoomBlock is an original multitrack audio player and visualizer, rendered using the ThreeJS library and the Web Audio API. It builds and explores relationships between 3D JavaScript animation and sound.

### Tempo Detection with JavaScript and the Web Audio API

BoomBlock's core algorithm is based on one outlined [here](http://joesul.li/van/beat-detection-using-web-audio/) by Joe Sullivan. The algorithm generates an interval by which to iterate through a massive array of the mp3 waveform's PCM data, searching for amplitude peak, and when it finds a peak, it stores the index of that peak in an array:

```JavaScript

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

  //...

}

```

The algorithm then analyzes each peak's index against it's most adjacent peak, and stores those relational intervals in a counter hash. Essentially, this process generates a histogram of the most common intervals between loudness peaks in the song:

```JavaScript

class BeatAnalyser {

  //...

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

  //...

}

```

The algorithm then uses the ratio between the length of the PCM data array (generally around 9 million floating point values for a 3.5 minute mp3) and the length of the song in seconds to compute the BPM (beats per minute) of the song:

```JavaScript

class BeatAnalyser {

  //...

  getIntervalInMilliseconds() {
    const tempo = this.mostCommonInterval/this.increment;
    const bpm = Math.round((1/tempo) * 60 * 1000 * 2);
    return (60*1000*4/(bpm)); //gives beats in ms
  }

}

```

In preliminary testing, the algorithm was able to compute the BPM to within 0.2 BPM of the actual rate; I decided to round this value because a) most of my songs run at an integer BPM and b) even an error of 0.05 BPM will become jarring during playback, because the animation will begin to lag behind or jump ahead of the beat. The full algorithm can be found [here](https://github.com/milesmcleod/boomblock/blob/master/frontend/audio_components/beat_analysis.js) in the repo.

### Syncing tempo to Animation

Web audio sourceNodes can only be used once; this means that if the song is paused, those nodes must be garbage collected, and new ones must be generated. I employed a system that keeps track of where in the song we were when it was paused, and then that value sets the start point in the mp3 file when playback is resumed.

The animation utilizes timeouts and intervals to add and remove blocks on beat. This presented a challenge. To make sure that the beat is re-synced with the animation after pausing and resuming playback, I wrote the following:

```JavaScript

// in the DrumStack class

setInterval() {
  const tempo = this.audio.globalTempo;
  const pausedAt = this.audio.pausedAt;
  //this is the coolest thing ever
  const beatOffset = pausedAt ? (tempo - ((pausedAt) % tempo)) : 0;
  this.set8thNoteTimeouts(beatOffset);
  window.setTimeout(() => {
    if (beatOffset) {
      this.reset8thNoteTimeouts();
      this.resetStack(this.scene);
      this.set8thNoteTimeouts(0);
    }
    this.intervalId = window.setInterval(() => {
      this.reset8thNoteTimeouts();
      this.resetStack(this.scene);
      this.set8thNoteTimeouts(0);
    }, this.audio.globalTempo);
  }, beatOffset);
}

//...

set8thNoteTimeouts (beatOffset) {
  this.reset8thNoteTimeouts();
  let eighthNotes = [
    0,
    (this.audio.globalTempo/8),
    (2 * this.audio.globalTempo/8),
    (3 * this.audio.globalTempo/8),
    (4 * this.audio.globalTempo/8),
    (5 * this.audio.globalTempo/8),
    (6 * this.audio.globalTempo/8),
    (7 * this.audio.globalTempo/8)
  ];
  if (beatOffset) {
    eighthNotes = eighthNotes.map(el => (
      beatOffset - el
    ));
    eighthNotes = eighthNotes.filter(el => el >= 0 && el < beatOffset);
  }
  eighthNotes.forEach(note => {
    const id = window.setTimeout(() => this.stack(), note);
    this.timeoutIds.push(id);
  });
}



```

The beat offset uses the global tempo value to track how far into a particular measure we were when playback was paused, and then when playback is resumed, the algorithm calculates how exactly the intervals and timeouts should be set such that the stacking blocks resume stacking and disappearing at the correct moment in the beat.
