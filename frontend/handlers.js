import World from './three_components/core/world';
import Lighting from './three_components/core/lighting';
import Island from './three_components/core/island';
import BoomBlock from './three_components/core/boomblock';
import DrumStack from './three_components/drum_stack';
import TrainTrack from './three_components/traintrack';
import AudioTracks from './audio_components/audio_tracks';
import BeatAnalyser from './audio_components/beat_analysis';
import Buildings from './three_components/buildings';

class Handlers {
  constructor(audio, world, drumStacks) {
    this.audio = audio;
    this.world = world;
    this.drumStacks = drumStacks;
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handlePlay() {
    if (!this.audio.playing) {
      this.audio.masterGain.gain.value = 1;
      this.audio.start();
      this.drumStacks.forEach((el) => {
        el.resetInterval();
        el.reset8thNoteTimeouts();
        el.setInterval();
      });
    }
  }

  handlePause() {
    const killId = setTimeout(function() { //this little function comes from mplungjan's post on stack overflow:
      for (let i = killId; i > 0; i--) window.clearInterval(i); //https://stackoverflow.com/questions/3141064/how-to-stop-all-timeouts-and-intervals-using-javascript
    }, 15);
    if (this.audio.playing) {
      this.audio.masterGain.gain.value = 0;
      this.audio.stop();
      window.removeEventListener(
        'mouseup', this.handleClick, false
      );
      this.drumStacks.forEach((el) => {
        el.resetInterval();
        el.reset8thNoteTimeouts();
      });
      this.audio.reload();
      this.loadCheck();
    }
  }

  handleReset() {
    const killId = setTimeout(function() {
      for (let i = killId; i > 0; i--) window.clearInterval(i);
    }, 15);
    if (this.audio.playing) {
      this.audio.masterGain.gain.value = 0;
      this.audio.stop();
    }
    this.audio.masterGain.gain.value = 1;
    window.removeEventListener(
      'mouseup', this.handleClick, false
    );
    this.audio.pausedAt = 0;
    this.audio.resetting = 1;
    this.drumStacks.forEach((el) => {
      el.resetInterval();
      el.reset8thNoteTimeouts();
      el.resetStack();
    });
    window.setTimeout(() => { this.audio.resetting = 0; }, 400);
    this.audio.reload();
    this.loadCheck();
  }

  handleMute() {
    const boomBlockObject = this.world.scene.children.filter(obj => (
      obj.name === 'boombox'
    ))[0];
    if (this.audio.masterGain.gain.value) {
      this.audio.masterGain.gain.value = 0;
      boomBlockObject.children.filter(obj => (
        obj.name === 'muteButton'
      ))[0].material.color.set(0x0000ff);
      // clickElement.object.material.color.set(0x00ffff);
    } else {
      this.audio.masterGain.gain.value = 1;
      boomBlockObject.children.filter(obj => (
        obj.name === 'muteButton'
      ))[0].material.color.set(0x00ffff);
    }
  }

  handleTrackMute(trackNum) {
    const clickElement = this.world.intersects[0];
    const tracks = [null, 'drums', 'bass', 'melody', 'samples'];
    const gain = this.audio[`${tracks[trackNum]}Gain`].gain;
    if (gain.value) {
      gain.value = 0;
      clickElement.object.material.color.set(0x0000ff);
    } else {
      gain.value = 1;
      clickElement.object.material.color.set(0x00ffff);
    }
  }

  handleClick () {
    const clickElement = this.world.intersects[0];
    if (clickElement) switch(clickElement.object.name) {
      case 'play':
        this.handlePlay();
        break;
      case 'pause':
        this.handlePause();
        break;
      case 'reset':
        this.handleReset();
        break;
      case 'muteButton':
      case 'mute':
        this.handleMute();
        break;
      case 'track1':
      case 'track2':
      case 'track3':
      case 'track4':
        this.handleTrackMute(clickElement.object.name.slice(5));
        break;
    }
  }

  handleMove () {
    const worldEl = document.getElementById('world');
    const hoverElement = this.world.intersects[0];
    if (hoverElement && [
      'mute', 'play', 'pause', 'reset', 'muteButton',
      'track1', 'track2', 'track3', 'track4'
    ].includes(hoverElement.object.name)) {
      worldEl.classList.add('world-click');
    } else {
      worldEl.classList.remove('world-click');
    }
  }

  loadCheck () {
    window.setTimeout(() => {
      if (this.audio.loaded === 1) {
        window.addEventListener('mouseup', this.handleClick, false);
        window.addEventListener('mousemove', this.handleMove, false);
        const night = document.getElementById('night-switch');
        night.addEventListener('click', (e) => {
          const world = document.getElementById('world');
          if (world.classList.contains('background-black')) {
            world.classList.remove('background-black');
          } else {
            world.classList.add('background-black');
          }
        });
        this.audio.beatAnalyser = new BeatAnalyser(this.audio.drumsBuffer);
        this.audio.globalTempo = Math.round(
          this.audio.beatAnalyser.getIntervalInMilliseconds()
        );
      } else {
        this.loadCheck();
      }
    }, 10);
  }
}

export default Handlers;
