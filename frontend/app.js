// entry.jsx
import World from './three_components/core/world';
import Lighting from './three_components/core/lighting';
import Island from './three_components/core/island';
import Water from './three_components/core/water';
import Playlist from './three_components/core/playlist';
import BoomBlock from './three_components/core/boomblock';
import DrumStack from './three_components/drum_stack';
import BigTree from './three_components/plants/big_tree';
import TrainTrack from './three_components/traintrack';
import AudioTracks from './audio_components/audio_tracks';
import BeatAnalyser from './audio_components/beat_analysis';
import Buildings from './three_components/buildings';
import Handlers from './handlers';
import Test from './three_components/test';

document.addEventListener('DOMContentLoaded', () => {

  const audio = new AudioTracks();
  audio.load();
  window.audio = audio;

  const world = new World();
  const lighting = new Lighting(world.scene);
  const island = new Island(world.scene);
  const water = new Water(world.scene);
  const boomblock = new BoomBlock(world.scene);
  const bigTree = new BigTree([250, 400, -650], audio, world.scene, 6, '1');
  const bigTree2 = new BigTree([-660, -220, 840], audio, world.scene, 2, '2');
  const bigTree3 = new BigTree([-800, -150, -100], audio, world.scene, 3, '3');
  const bigTree4 = new BigTree([-10, 140, -200], audio, world.scene, 5, '4');
  const bigTree5 = new BigTree([960, -130, 260], audio, world.scene, 4, '5');
  const handlers = new Handlers(audio, world, [bigTree, bigTree2, bigTree3, bigTree4, bigTree5]);
  window.world = world;

  handlers.loadCheck();

  const about = document.getElementsByClassName('about-link')[0];
  about.addEventListener("click", () => {
    const modal = document.getElementsByClassName('about-modal')[0];
    modal.classList.add('show-modal');
    modal.addEventListener("click", () => {
      modal.classList.remove('show-modal');
    });
  });

  world.loop(audio);
});
