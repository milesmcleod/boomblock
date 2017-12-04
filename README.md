# BoomBlock - An Interactive Audio Player with ThreeJS

## Background and Overview

Boomblock is a custom multi-track audio player, rendered using the ThreeJS library.

A multi-track audio composition is one that is broken out into individual files for each instrument or for groups of instruments (melodic, bass-heavy, percussive).

The user activates different pieces of the multi-track audio by interacting with the Boomblock. As the user activates and deactivates different elements of the audio, the ThreeJS world also reacts. New elements appear and move according to amplitude data generated from the multitracked audio files.

This project aims to experiment with the possible relationships between 3d javascript animation and sound.

## Functionality and MVP

Boomblock MVPs:

- [ ] The user can activate and deactivate different parts of a multitrack audio composition that play in sync by interacting with the boomblock

- [ ] Global play, pause, mute, and reset capability

- [ ] The surrounding ThreeJS environment reacts differently to the activation of each of the different tracks

- [ ] The main ThreeJS object (the boomblock itself) realizes a unique digital audio interface

- [ ] The user can select from several different multitrack compositions

In addition, this project will include:

- [ ] A "What is going on?" modal describing the overall concept of the application

## Wireframes

This is a single-page app. The link to the "What is going on?" modal and the links to my personal profiles will be in a translucent top nav, which will also contain global audio controls (play, pause, mute, reset). The rest of the page will be the "World." A loading display will also be necessary.

The boomblock itself will be a ThreeJS object, based loosely on a reel-to-reel tape machine. It will include four colored buttons, each for activating one of the multitrack elements. It will also include a button that activates a dropdown, allowing the user to select a different multitrack composition.

The boomblock will sit on a 3d city block, as if it were one of the buildings.

Below is a basic 2d rendering of the 3d space that will make up the world. The user will have a very limited ability to pan and zoom, using Three's OrbitalControls module.

<p align="center">
  <img src="https://raw.githubusercontent.com/milesmcleod/purplenote-wireframes/master/Untitled%20Diagram.png"/>
</p>

## Architecture and Technologies

* ThreeJS for modeling the interactive world and filling the "world" DOM element
* Web Audio API for audio playback
* Webpack for bundling
* React for managing the overall application architecture with the following components:
    * Root
    * App
    * Header with global audio controls and links
    * About modal (including simple directions)
    * ThreeJS world component

## Implementation Timeline

### Over the weekend:

- [ ] Experiment with ThreeJS; completed web tutorial for basic ThreeJS geometry concepts
- [ ] Begin building prototype "world"
- [ ] Create the react application and instantiate the ThreeJS rendering
- [ ] Install necessary NPM dependencies

### Day 1:

- [ ] Learn the basics of WebAudioAPI and begin serving audio assets
- [ ] Implement Web Audio source summing to achieve multitrack playback (see WebAudioAPI Docs part 4.1)
- [ ] Build onClick functionality into the boomblock that triggers multitrack audio playback, and uses the GainNode functionality of the WebAudioAPI to control gain on individual tracks
- [ ] Build global audio controls that pause, play, mute, and reset playback

### Day 2:

- [ ] Build out the ThreeJS world; complete drawing all static      elements, with special detail given to the boomblock.
- [ ] Begin working in components that react to the audio. By the end of the day, the reels should spin, and tempo data should control color shifts and some moving components on the boomblock.

### Day 3:

- [ ] Build a dropdown from the boomblock that changes the song.
- [ ] Time to make the world move to the beat. Buildings should sway.

### Day 4:

- [ ] Complete a satisfactory collection of ThreeJS components that react dynamically to the audio data.
- [ ] Style the background and polish the lighting
- [ ] Complete styling the interface and write out the About section.

### Bonus

- [ ] Weather
- [ ] Sun/moon that moves and corresponds with the actual time of day
