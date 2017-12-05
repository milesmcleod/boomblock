import React from 'react';

class AudioTracks extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <audio controls
          src="https://s3-us-west-1.amazonaws.com/boomblock/boomblock_beat.mp3"
          id="beat-master"
          >
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

export default AudioTracks;
