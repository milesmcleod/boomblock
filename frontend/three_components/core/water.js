import * as THREE from 'three';

class Water {
  createWater(scene) {
    this.water = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(15000,15000),
      new THREE.MeshPhongMaterial({color: 0x33ccff})
    );
    this.water.rotation.x = -Math.PI/2;
    this.water.position.y = -300;
    this.water.material.transparent = true;
    this.water.material.opacity = 0.7;
    // this.water.receiveShadow = true;
    scene.add(this.water);
  }

  constructor(scene) {
    this.createWater(scene);
  }
}

export default Water;
