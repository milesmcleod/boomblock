// entry.jsx
import * as THREE from 'three';
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
import Materials from './three_components/materials/material_core';

document.addEventListener('DOMContentLoaded', () => {

  const audio = new AudioTracks();
  audio.load();
  window.audio = audio;

  const world = new World();
  const lighting = new Lighting(world.scene);
  const island = new Island(world.scene);
  const water = new Water(world.scene);
  const boomblock = new BoomBlock(world.scene);
  const materials = new Materials();
  const bigTree = new BigTree(materials, [250, 400, -650], audio, world.scene, 6, '1');
  const bigTree2 = new BigTree(materials, [-660, -220, 840], audio, world.scene, 2, '2');
  const bigTree3 = new BigTree(materials, [-800, -150, -100], audio, world.scene, 3, '3');
  const bigTree4 = new BigTree(materials, [-10, 140, -200], audio, world.scene, 5, '4');
  const bigTree5 = new BigTree(materials, [960, -130, 260], audio, world.scene, 4, '5');
  const handlers = new Handlers(
    audio,
    world,
    [bigTree, bigTree2, bigTree3, bigTree4, bigTree5]
  );
  const fog = new THREE.Fog( 0x4ff904, 0, 750 );
  world.scene.add(fog);
  window.world = world;

  handlers.loadCheck();

  //refactor all of these click handlers out into a new htmlhandler class

  const about = document.getElementsByClassName('about-link')[0];

  about.addEventListener("click", () => {
    const modal = document.getElementsByClassName('about-modal')[0];
    modal.classList.add('show-modal');
    modal.addEventListener("click", () => {
      modal.classList.remove('show-modal');
    });
  });

  const night = document.getElementById('night-switch');

  night.addEventListener('click', (e) => {
    const worldDiv = document.getElementById('world');
    if (worldDiv.classList.contains('background-black')) {
      worldDiv.classList.remove('background-black');
      handlers.setMode('dayTime');
      world.sunRise();
    } else {
      worldDiv.classList.add('background-black');
      handlers.setMode('nightTime');
      world.sunSet();
    }
  });

  const playlistDiv = document.getElementById("playlist");
  const playlistLink = document.getElementById("playlist-link");

  playlistDiv.addEventListener("click", (e) => {
    const playlist = document.getElementsByClassName("playlist-menu")[0];
    if (
      playlist.classList.contains('show')
      && e.target === playlistLink
    ) { //also need to verify click target
      playlist.classList.remove("show");
      window.setTimeout(() => {
        playlist.classList.add("hide");
      }, 500);
    } else if (e.target === playlistLink) {
      window.setTimeout(() => {
        playlist.classList.add("show");
      }, 10);
      playlist.classList.remove("hide");
    }
  });

  const controlsDiv = document.getElementById("controls");
  const controlsLink = document.getElementById("controls-link");

  controlsDiv.addEventListener("click", (e) => {
    const controls = document.getElementsByClassName("controls-menu")[0];
    if (
      controls.classList.contains('show')
      && e.target === controlsLink
    ) { //also need to verify click target
      controls.classList.remove("show");
      window.setTimeout(() => {
        controls.classList.add("hide");
      }, 500);
    } else if (e.target === controlsLink) {
      window.setTimeout(() => {
        controls.classList.add("show");
      }, 10);
      controls.classList.remove("hide");
    } else if (e.target.classList.contains('play')) {
      handlers.handlePlay();
    } else if (e.target.classList.contains('pause')) {
      handlers.handlePause();
    } else if (e.target.classList.contains('reset')) {
      handlers.handleReset();
    } else if (e.target.classList.contains('mute')) {
      handlers.handleMute();
    } else if (e.target.classList.contains('mt1')) {
      handlers.handleForeignTrackMute(1);
    } else if (e.target.classList.contains('mt2')) {
      handlers.handleForeignTrackMute(2);
    } else if (e.target.classList.contains('mt3')) {
      handlers.handleForeignTrackMute(3);
    } else if (e.target.classList.contains('mt4')) {
      handlers.handleForeignTrackMute(4);
    }
  });

  world.loop(audio);
});
