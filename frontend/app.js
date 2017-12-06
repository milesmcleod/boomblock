// entry.jsx
import World from './three_components/world';
import Lighting from './three_components/lighting';
import Floor from './three_components/floor';
import BoomBlock from './three_components/boomblock';
import TrainTrack from './three_components/traintrack';
import AudioTracks from './audio_components/audio_tracks';
import Buildings from './three_components/buildings';

document.addEventListener('DOMContentLoaded', () => {

  const audio = new AudioTracks();
  audio.load();
  window.audio = audio;

  const world = new World();
  const lighting = new Lighting(world.scene);
  const floor = new Floor(world.scene);
  const boomblock = new BoomBlock(world.scene);
  const traintrack = new TrainTrack(world.scene);
  const buildings = new Buildings(world.scene);
  window.world = world;

  const set8thNotes = () => {
    [0, 366, 735, 1100, 1467, 1834, 2201, 2568].forEach(time => {
      window.setTimeout(() => world.melodyStack(), time);
    });
  };

  const handleClick = () => {
    const clickElement = world.intersects[0];
    const boomBlockObject = world.scene.children.filter(obj => obj.name === 'boombox')[0];
    if (clickElement) switch(clickElement.object.name) {
      case 'play':
        const beatOffset = audio.pausedAt ? (2934 - ((audio.pausedAt) % 2934)) : 0;
        console.log(beatOffset); //this is the coolest thing ever
        window.setTimeout(() => {
          world.resetMelodyStack();
          world.melodyIntervalId = window.setInterval(() => {
            world.resetMelodyStack();
            set8thNotes();
          }, 2934); //2934 is my calculated value in ms for the length of 1 measure; i should automate this
        }, beatOffset);
        // audio.masterAnalyser.getByteFrequencyData(audio.masterDataArray);
        // if (audio.drumsDataArray[0] > -60) window.setTimeout(() => {
        //   world.melodyStack();
        //   world.melodyStackId = window.setInterval(() => {
        //     world.melodyStack();
        //   }, (2934/8)); //2935 is my calculated value in ms for the length of 1 measure; i should automate this
        // }, beatOffset); //could have used this if 2935/8 was an integer
        if (!audio.playing) {
          audio.masterGain.gain.value = 1;
          audio.start();
        }
        break;
      case 'pause':
        if (audio.playing) {
          audio.masterGain.gain.value = 0;
          audio.stop();
          window.removeEventListener('mouseup', handleClick, false);
          window.clearInterval(world.melodyIntervalId);
          window.clearInterval(world.melodyStackId);
          audio.reload();
          loadCheck();
        }
        break;
      case 'reset':
        if (audio.playing) {
          audio.masterGain.gain.value = 0;
          audio.stop();
        }
        audio.masterGain.gain.value = 1;
        window.removeEventListener('mouseup', handleClick, false);
        audio.reload();
        audio.pausedAt = 0;
        audio.resetting = 1;
        window.clearInterval(world.melodyIntervalId);
        window.clearInterval(world.melodyStackId);
        window.setTimeout(() => { audio.resetting = 0; }, 400);
        loadCheck();
        break;
      case 'muteButton':
      case 'mute':
        if (audio.masterGain.gain.value) {
          audio.masterGain.gain.value = 0;
          boomBlockObject.children.filter(obj => (
            obj.name === 'muteButton'
          ))[0].material.color.set(0x0000ff);
          // clickElement.object.material.color.set(0x00ffff);
        } else {
          audio.masterGain.gain.value = 1;
          boomBlockObject.children.filter(obj => (
            obj.name === 'muteButton'
          ))[0].material.color.set(0x00ffff);
        }
        break;
      case 'track1':
        if (audio.drumsGain.gain.value) {
          audio.drumsGain.gain.value = 0;
          clickElement.object.material.color.set(0x0000ff);
        } else {
          audio.drumsGain.gain.value = 1;
          clickElement.object.material.color.set(0x00ffff);
        }
        break;
      case 'track2':
        if (audio.bassGain.gain.value) {
          audio.bassGain.gain.value = 0;
          clickElement.object.material.color.set(0x0000ff);
        } else {
          audio.bassGain.gain.value = 1;
          clickElement.object.material.color.set(0x00ffff);
        }
        break;
      case 'track3':
        if (audio.melodyGain.gain.value) {
          audio.melodyGain.gain.value = 0;
          clickElement.object.material.color.set(0x0000ff);
        } else {
          audio.melodyGain.gain.value = 1;
          clickElement.object.material.color.set(0x00ffff);
        }
        break;
      case 'track4':
        if (audio.samplesGain.gain.value) {
          audio.samplesGain.gain.value = 0;
          clickElement.object.material.color.set(0x0000ff);
        } else {
          audio.samplesGain.gain.value = 1;
          clickElement.object.material.color.set(0x00ffff);
        }
        break;
    }
  };

  const handleMove = () => {
    const worldEl = document.getElementById('world');
    const hoverElement = world.intersects[0];
    if (hoverElement && [
      'mute', 'play', 'pause', 'reset', 'muteButton', 'track1', 'track2', 'track3', 'track4'
    ].includes(hoverElement.object.name)) {
      worldEl.classList.add('world-click');
    } else {
      worldEl.classList.remove('world-click');
    }
  };

  const loadCheck = () => {
    window.setTimeout(() => {
      if (audio.loaded === 1) {
        window.addEventListener('mouseup', handleClick, false);
        window.addEventListener('mousemove', handleMove, false);
      } else {
        loadCheck();
      }
    }, 10);
  };

  loadCheck();

  world.loop(audio);
});
