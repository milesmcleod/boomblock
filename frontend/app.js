// entry.jsx
import World from './three_components/world';
import Lighting from './three_components/lighting';
import Floor from './three_components/floor';
import BoomBlock from './three_components/boomblock';
import TrainTrack from './three_components/traintrack';
import AudioTracks from './audio_components/audio_tracks';

document.addEventListener('DOMContentLoaded', () => {

  const audio = new AudioTracks();
  audio.load();
  window.audio = audio;

  const world = new World();
  const lighting = new Lighting(world.scene);
  const floor = new Floor(world.scene);
  const boomblock = new BoomBlock(world.scene);
  const traintrack = new TrainTrack(world.scene);
  window.world = world;

  const handleClick = () => {
    const clickElement = world.intersects[0];
    switch(clickElement.object.name) {
      case 'play':
        if (!audio.playing) {
          audio.masterGain.gain.value = 1;
          clickElement.object.material.color.set(0xffffff);
          world.scene.children[3].children.filter(obj => (
            obj.name === 'pause'
          ))[0].material.color.set(0x000000);
          audio.start();
        }
        break;
      case 'pause':
        if (audio.playing) {
          audio.masterGain.gain.value = 0;
          clickElement.object.material.color.set(0xffffff);
          world.scene.children[3].children.filter(obj => (
            obj.name === 'play'
          ))[0].material.color.set(0x000000);
          audio.stop();
          window.removeEventListener('mouseup', handleClick, false);
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
        loadCheck();
        break;
      case 'mute':
        if (audio.masterGain.gain.value) {
          audio.masterGain.gain.value = 0;
        } else {
          audio.masterGain.gain.value = 1;
        }
        break;
      case 'track1':
        if (audio.drumsGain.gain.value) {
          audio.drumsGain.gain.value = 0;
        } else {
          audio.drumsGain.gain.value = 1;
        }
        break;
      case 'track2':
        if (audio.bassGain.gain.value) {
          audio.bassGain.gain.value = 0;
        } else {
          audio.bassGain.gain.value = 1;
        }
        break;
      case 'track3':
        if (audio.melodyGain.gain.value) {
          audio.melodyGain.gain.value = 0;
        } else {
          audio.melodyGain.gain.value = 1;
        }
        break;
      case 'track4':
        if (audio.samplesGain.gain.value) {
          audio.samplesGain.gain.value = 0;
        } else {
          audio.samplesGain.gain.value = 1;
        }
        break;
    }
  };

  const loadCheck = () => {
    window.setTimeout(() => {
      if (audio.loaded === 1) {
        window.addEventListener('mouseup', handleClick, false);
      } else {
        loadCheck();
      }
    }, 10);
  };

  loadCheck();

  world.loop();
});
