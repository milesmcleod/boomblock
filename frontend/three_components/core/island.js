import * as THREE from 'three';

class Island {

  createIsland(scene) {
    const islandMaterial = new THREE.MeshPhongMaterial({color: 0x86592d});

    this.cylinder1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 300, 300, 150, 32 ),
      islandMaterial
    );
    this.cylinder1.position.y = (-180 - 150);
    this.cylinder1.position.x = -400;
    this.cylinder1.position.z = 400;
    // this.cylinder1.receiveShadow = true;
    // this.cylinder1.castShadow = true;
    scene.add(this.cylinder1);

    this.cylinder2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 700, 700, 300, 32 ),
      islandMaterial
    );
    this.cylinder2.position.y = (-180 - 150);
    this.cylinder2.position.z = -100;
    // this.cylinder2.receiveShadow = true;
    // this.cylinder2.castShadow = true;
    scene.add(this.cylinder2);

    this.cylinder3 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 400, 400, 500, 32 ),
      islandMaterial
    );
    this.cylinder3.position.y = (-180);
    this.cylinder3.position.x = 400;
    this.cylinder3.position.z = -550;
    // this.cylinder3.receiveShadow = true;
    // this.cylinder3.castShadow = true;
    scene.add(this.cylinder3);

    this.cylinder4 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry( 350, 350, 900, 32 ),
      islandMaterial
    );
    this.cylinder4.position.y = (-100);
    this.cylinder4.position.x = -300;
    this.cylinder4.position.z = -650;
    // this.cylinder4.receiveShadow = true;
    // this.cylinder4.castShadow = true;
    scene.add(this.cylinder4);
  }

  constructor(scene) {
    this.createIsland(scene);
  }
}

export default Island;
