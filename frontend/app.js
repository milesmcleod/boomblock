// entry.jsx
import World from './three_components/world';
import Lighting from './three_components/lighting';
import Floor from './three_components/floor';
import BoomBlock from './three_components/boomblock';
import DrumStack from './three_components/drum_stack';
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
  const floor = new Floor(world.scene);
  const boomblock = new BoomBlock(world.scene);
  const traintrack = new TrainTrack(world.scene);
  const buildings = new Buildings(world.scene);
  const drumStack = new DrumStack(audio, world.scene);
  const test = new Test(world.scene);
  const handlers = new Handlers(audio, world, drumStack);
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
