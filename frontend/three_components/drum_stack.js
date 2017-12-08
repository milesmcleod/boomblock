import * as THREE from 'three';

class DrumStack {
  constructor(audio, scene) {
    this.audio = audio;
    this.scene = scene;
    this.drumStackY = -130;
    this.drumStackwidth = 150;
    this.drumStackDepth = 150;
    this.drumStackRotation = 0;
    this.drumStackColors = undefined;
  }

  set8thNotes () {
  [
    0,
    this.audio.globalTempo/8,
    2 * this.audio.globalTempo/8,
    3 * this.audio.globalTempo/8,
    4 * this.audio.globalTempo/8,
    5 * this.audio.globalTempo/8,
    6 * this.audio.globalTempo/8,
    7 * this.audio.globalTempo/8
  ].forEach(time => {
      window.setTimeout(() => this.stack(), time);
    });
  }

  stack() {
    const rainbow = [
      0xcc0000,
      0xff3300,
      0xff9933,
      0xffcc00,
      0xffff00,
      0x66ff33,
      0x66ff66,
      0x00ff99,
      0x00ccff,
      0x0066ff,
      0x7f00ff,
      0xff00ff
    ];
    if (!this.drumStackColors) {
      this.drumStackColors = [
        rainbow[Math.floor(Math.random()*12)],
        rainbow[Math.floor(Math.random()*12)]
      ];
    }
    const geometry = new THREE.BoxBufferGeometry(
      this.drumStackwidth,
      150,
      this.drumStackDepth
    );
    const material = new THREE.MeshBasicMaterial({
      color: this.drumStackColors[Math.floor(Math.random()*2)]
    });
    const drumBlock = new THREE.Mesh(geometry, material);
    drumBlock.name = 'drumBlock';
    drumBlock.position.set(-1050, this.drumStackY, 0);
    drumBlock.rotateY(this.drumStackRotation);
    this.scene.add(drumBlock);
    this.drumStackY += 150;
    this.drumStackRotation += Math.PI/8;
  }

  resetStack() {
    this.drumStackY = -130;
    this.drumStackRotation = 0;
    this.drumStackColors = undefined;
    this.scene.children.filter(obj => (
      obj.name === 'drumBlock'
    )).forEach(el => this.scene.remove(el));
  }
}

export default DrumStack;
