import * as THREE from 'three';

class Playlist {

  buildBoard(scene) {
    const boardGeometry = new THREE.BoxBufferGeometry( 500, 600, 20);
    const boardMaterial = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    this.board = new THREE.Mesh(boardGeometry, boardMaterial);
    this.board.position.set(-750, 100, 450);
    this.board.material.transparent = true;
    this.board.material.opacity = this.initialOpacity;
    // scene.add( this.board );
    this.playlist.add( this.board );
  }

  addLinks (scene) {

  }

  addPlaylist(scene) {
    scene.add( this.playlist );
  }

  constructor(scene) {
    this.initialOpacity = 0;
    this.opacityIncrement = 0.01;
    this.maxOpacity = 0.8;
    this.playlist = new THREE.Group;
    this.buildBoard();
    this.addLinks();
    this.addPlaylist(scene);
  }


}

export default Playlist;
