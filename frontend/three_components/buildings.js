import * as THREE from 'three';

class Buildings {

  create1 (scene) {
    const building1Geometry = new THREE.BoxBufferGeometry(320, 200, 200);
    const building1Material = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    const building1 = new THREE.Mesh(building1Geometry, building1Material);
    building1.position.set(-1050, -100, 0);
    building1.castShadow = true;
    building1.receiveShadow = true;
    scene.add(building1);
  }

  create2 (scene) {
    const building2Geometry = new THREE.BoxBufferGeometry(320, 2000, 200);
    const building2Material = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    const building2 = new THREE.Mesh(building2Geometry, building2Material);
    building2.position.set(-550, -50, 0);
    building2.castShadow = true;
    building2.receiveShadow = true;
    scene.add(building2);
  }

  tower3 (scene) {
    const building3Geometry = new THREE.BoxBufferGeometry(400, 20, 300);
    const building3Material = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    const building3 = new THREE.Mesh(building3Geometry, building3Material);
    building3.position.set(550, -180, 0);
    building3.castShadow = true;
    building3.receiveShadow = true;
    scene.add(building3);
  }

  create4 (scene) {
    const building4Geometry = new THREE.BoxBufferGeometry(320, 1600, 200);
    const building4Material = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    const building4 = new THREE.Mesh(building4Geometry, building4Material);
    building4.position.set(1050, -50, 0);
    building4.castShadow = true;
    building4.receiveShadow = true;
    scene.add(building4);
  }



  constructor(scene) {
    this.create1(scene);
    this.create2(scene);
    this.tower3(scene);
    this.create4(scene);
  }
}

export default Buildings;
