import * as THREE from 'three';

class Lighting {
  createAmbientLight(scene) {
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(this.ambientLight);
  }

  createSpotLight(scene) {
    this.spotLight = new THREE.SpotLight( 0xffffff, 2 );
    this.spotLight.position.set( 200, 500, 500 );
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 500;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 30;
    this.spotLight.angle = Math.PI/5;
    scene.add( this.spotLight );
  }

  constructor(scene) {
    this.createAmbientLight(scene);
    this.createSpotLight(scene);
  }
}

export default Lighting;
