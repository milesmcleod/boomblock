import React from 'react';
import World from '../three_components/world';
import Lighting from '../three_components/lighting';
import Floor from '../three_components/floor';
import BoomBlock from '../three_components/boomblock';
import TrainTrack from '../three_components/traintrack';

class ThreeWorld extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.world = new World();
    this.lighting = new Lighting(this.world.scene);
    this.floor = new Floor(this.world.scene);
    this.boomblock = new BoomBlock(this.world.scene);
    this.traintrack = new TrainTrack(this.world.scene);
    this.world.loop();
  }

  render () {
    return (
      <div id="world" className="world"></div>
    );
  }
}

export default ThreeWorld;
