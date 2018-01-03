import * as THREE from 'three';
import {
  smallLeaves1Geometry,
  smallLeaves2Geometry,
  smallLeaves3Geometry,
  bigLeaves1Geometry,
  bigLeaves2Geometry,
  bigLeaves3Geometry,
} from './tree_geometries';

class Test {
  createObject(scene, geometry) {
    const testMaterial = new THREE.MeshPhongMaterial({
      color: 0x66ff66,
      side: THREE.DoubleSide
    });
    this.object = new THREE.Mesh(geometry, testMaterial);
    this.object.position.set(0, 300, 300);
    // this.object.receiveShadow = true;
    scene.add(this.object);
  }

  constructor(scene) {
    this.createObject(scene, bigLeaves1Geometry);
    this.createObject(scene, bigLeaves2Geometry);
    this.createObject(scene, bigLeaves3Geometry);
  }
}

export default Test;
