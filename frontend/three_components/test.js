import * as THREE from 'three';
import {
  smallLeaves1Geometry,
  smallLeaves2Geometry,
  smallLeaves3Geometry,
  bigLeavesGeometry} from './tree_geometries';

class Test {
  createObject(scene, geometry) {
    const testMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    this.object = new THREE.Mesh(geometry, testMaterial);
    this.object.position.set(0, 300, 300);
    this.object.receiveShadow = true;
    scene.add(this.object);
  }

  constructor(scene) {
    this.createObject(scene, smallLeaves1Geometry);
    this.createObject(scene, smallLeaves2Geometry);
    this.createObject(scene, smallLeaves3Geometry);
  }
}

export default Test;
