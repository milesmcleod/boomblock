import * as THREE from 'three';

class Lighting {
  createAmbientLight(scene) {
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    scene.add(this.ambientLight);
  }

  createSun(scene) {
    this.sun = new THREE.Mesh(
      new THREE.SphereBufferGeometry(200, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0xffff80 })
    );
    this.sun.position.set(800, 3000, -3000);
    scene.add( this.sun );
  }

  createSpotLight(scene) {
    this.spotLight = new THREE.SpotLight( 0xffffff, 5 );
    // this.spotLight.position.set( 200, 500, 500 );
    this.spotLight.position.set( 800, 3000, -3000 );
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 4000;
    this.spotLight.shadow.mapSize.height = 4000;
    this.spotLight.shadow.camera.near = 500;
    // this.spotLight.shadow.camera.far = 4000;
    // this.spotLight.shadow.camera.fov = 30;
    // this.spotLight.angle = Math.PI/5;
    scene.add( this.spotLight );
  }

  constructor(scene) {
    this.createAmbientLight(scene);
    this.createSun(scene);
    this.createSpotLight(scene);
  }
}

export default Lighting;
