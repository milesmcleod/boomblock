import * as THREE from 'three';
import { smallLeavesGeometry, bigLeavesGeometry} from './tree_geometries';

class Test {
  createObject(scene) {
    const testMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    this.object = new THREE.Mesh(smallLeavesGeometry, testMaterial);
    this.object.position.set(0, 100, 300);
    this.object.receiveShadow = true;
    scene.add(this.object);
  }

  constructor(scene) {
    // this.createObject(scene);
  }
}

export default Test;
