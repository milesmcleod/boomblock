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
    this.intervalId = undefined;
    this.timeoutIds = [];
  }

  set8thNoteTimeouts (beatOffset) {
    let eighthNotes = [
      0,
      (this.audio.globalTempo/8),
      (2 * this.audio.globalTempo/8),
      (3 * this.audio.globalTempo/8),
      (4 * this.audio.globalTempo/8),
      (5 * this.audio.globalTempo/8),
      (6 * this.audio.globalTempo/8),
      (7 * this.audio.globalTempo/8)
    ];
    if (beatOffset) {
      eighthNotes = eighthNotes.map(el => (
        beatOffset - el
      ));
      eighthNotes = eighthNotes.filter(el => el >= 0 && el < beatOffset);
    }
    console.log(eighthNotes);
    eighthNotes.forEach(note => {
      const id = window.setTimeout(() => this.stack(), note);
      this.timeoutIds.push(id);
    });
  }

  reset8thNoteTimeouts() {
    this.timeoutIds.forEach(id => window.clearTimeout(id));
  }

  setInterval() {
    const tempo = this.audio.globalTempo;
    const pausedAt = this.audio.pausedAt;
    //this is the coolest thing ever
    const beatOffset = pausedAt ? (tempo - ((pausedAt) % tempo)) : 0;
    this.set8thNoteTimeouts(beatOffset);
    window.setTimeout(() => {
      if (beatOffset) {
        this.reset8thNoteTimeouts();
        this.resetStack(this.scene);
        this.set8thNoteTimeouts(0);
      }
      this.intervalId = window.setInterval(() => {
        this.reset8thNoteTimeouts();
        this.resetStack(this.scene);
        this.set8thNoteTimeouts(0);
      }, this.audio.globalTempo);
    }, beatOffset);
    console.log(beatOffset);
  }

  resetInterval() {
    window.clearInterval(this.intervalId);
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
