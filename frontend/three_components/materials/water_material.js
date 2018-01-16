import * as THREE from 'three';

class WaterMaterial {
  constructor(timeMode) {
    if (timeMode === 'dayTime') {
      new THREE.MeshPhongMaterial({color: 0x1a75ff});
    } else {
      new THREE.MeshPhongMaterial({color: 0x000000});
    }
  }
}

export default WaterMaterial;
