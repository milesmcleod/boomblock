import * as THREE from 'three';

class Island {
  // createFloor(scene) {
  //   this.floor = new THREE.Mesh(
  //     new THREE.PlaneBufferGeometry(5000,5000),
  //     new THREE.MeshPhongMaterial({color: 0x000000})
  //   );
  //   this.floor.rotation.x = -Math.PI/2;
  //   this.floor.position.y = -180;
  //   this.floor.receiveShadow = true;
  //   scene.add(this.floor);
  // }

  createIsland(scene) {

    this.cylinder1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 300, 300, 150, 32 ),
      new THREE.MeshPhongMaterial({color: 0x000000})
    );
    this.cylinder1.position.y = (-180 - 300);
    this.cylinder1.position.x = -400;
    this.cylinder1.position.z = 400;
    this.cylinder1.receiveShadow = true;
    scene.add(this.cylinder1);

    this.cylinder2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 700, 700, 300, 32 ),
      new THREE.MeshPhongMaterial({color: 0x000000})
    );
    this.cylinder2.position.y = (-180 - 150);
    this.cylinder2.receiveShadow = true;
    scene.add(this.cylinder2);

    this.cylinder3 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 400, 400, 600, 32 ),
      new THREE.MeshPhongMaterial({color: 0x000000})
    );
    this.cylinder3.position.y = (-180);
    this.cylinder3.position.x = 400;
    this.cylinder3.position.z = -450;
    this.cylinder3.receiveShadow = true;
    scene.add(this.cylinder3);

    this.cylinder4 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 350, 350, 900, 32 ),
      new THREE.MeshPhongMaterial({color: 0x000000})
    );
    this.cylinder4.position.y = (-100);
    this.cylinder4.position.x = -300;
    this.cylinder4.position.z = -550;
    this.cylinder4.receiveShadow = true;
    scene.add(this.cylinder4);
  }

  constructor(scene) {
    // this.createFloor(scene);
    this.createIsland(scene);
  }
}

export default Island;
