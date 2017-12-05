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

  const loadCheck = () => {
    window.setTimeout(() => {
      if (audio.loaded === 1) {
        // audio.start();
        console.log('loaded up!');
      } else {
        loadCheck();
      }
    }, 1000);
  };

  loadCheck();

  const world = new World();
  const lighting = new Lighting(world.scene);
  const floor = new Floor(world.scene);
  const boomblock = new BoomBlock(world.scene);
  const traintrack = new TrainTrack(world.scene);

  world.loop();
});
