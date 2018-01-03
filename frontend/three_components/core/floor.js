import * as THREE from 'three';

class Floor {
  createFloor(scene) {
    this.floor = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(5000,5000),
      new THREE.MeshPhongMaterial({color: 0x000000})
    );
    this.floor.rotation.x = -Math.PI/2;
    this.floor.position.y = -180;
    this.floor.receiveShadow = true;
    scene.add(this.floor);
  }

  constructor(scene) {
    this.createFloor(scene);
  }
}

export default Floor;
