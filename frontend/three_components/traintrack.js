import * as THREE from 'three';

class TrainTrack {
  createTrack(scene) {
    const trackGeometry = new THREE.BoxGeometry(10000, 50, 200);
    const trackMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    this.trainTrack = new THREE.Mesh(trackGeometry, trackMaterial);
    this.trainTrack.position.set(0, 100, -300);
    scene.add(this.trainTrack);
  }

  constructor(scene) {
    this.createTrack(scene);
  }
}

export default TrainTrack;
