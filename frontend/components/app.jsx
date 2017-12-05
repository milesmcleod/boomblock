// app.jsx
import React from 'react';
import BoomBlock from './boomblock';
import AudioTracksContainer from './audio_tracks_container';

const App = () => (
  <div className='app'>
    <BoomBlock />
    <AudioTracksContainer />
  </div>
);

export default App;
