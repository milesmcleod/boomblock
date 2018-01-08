import * as THREE from 'three';
import * as Leaves from'./tree_geometries';

class BigTree {
  constructor(xyposition, audio, scene, type) {
    this.audio = audio;
    this.scene = scene;
    this.xyposition = xyposition;
    this.drumStackY = -100;
    this.drumStackZ = 0;
    this.drumStackZIncrement = 9;
    if (type === 1) {
      this.drumStackWidth = 150;
      this.drumStackHeight = 150;
      this.drumStackDepth = 150;
    } else if (type === 2) {
      this.drumStackWidth = 150;
      this.drumStackHeight = 100;
      this.drumStackDepth = 150;
    }
    this.drumStackRotation = 0;
    this.drumStackColors = undefined;
    this.intervalId = undefined;
    this.timeoutIds = [];
    this.stackPosition = 0;
    this.bigTrunkGeometry = new THREE.BoxBufferGeometry(
      this.drumStackWidth,
      this.drumStackHeight,
      this.drumStackDepth
    );
    this.bigTrunkDayMaterial = new THREE.MeshBasicMaterial({
      color: 0x623b00
    });
    this.leafMaterial = new THREE.MeshBasicMaterial({
      color: 0x059c46,
      side: THREE.DoubleSide
    });
  }

  set8thNoteTimeouts (beatOffset) {
    this.reset8thNoteTimeouts();
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
  }

  resetInterval() {
    window.clearInterval(this.intervalId);
  }

  addBlock(position, geometry, material) {
    const drumBlock = new THREE.Mesh(geometry, material);
    drumBlock.name = 'drumBlock';
    const x = position[0];
    const y = position[1] + this.drumStackY;
    const z =position[2];
    // const z =position[2] + this.drumStackZ;
    drumBlock.position.set(x, y, z);
    // drumBlock.rotateX(this.drumStackRotation/2);
    drumBlock.rotateY(this.drumStackRotation);
    this.scene.add(drumBlock);
  }

  addLeaves(position, stackPosition) {
    let leafSize;
    switch (stackPosition % 8) {
      case 0:
        leafSize = 120;
        break;
      case 1:
        leafSize = 140;
        break;
      case 2:
        leafSize = 160;
        break;
      case 3:
        leafSize = 180;
        break;
      case 4:
        leafSize = 200;
        break;
      case 5:
        leafSize = 220;
        break;
      case 6:
        leafSize = 240;
        break;
      case 7:
        leafSize = 260;
        break;
    }
    const geometries = Leaves.buildSmallLeaves1(leafSize);
    const leaves1 = new THREE.Mesh(geometries[0], this.leafMaterial);
    const leaves2 = new THREE.Mesh(geometries[1], this.leafMaterial);
    const leaves3 = new THREE.Mesh(geometries[2], this.leafMaterial);
    const leaves = new THREE.Group();
    leaves.add(leaves1);
    leaves.add(leaves2);
    leaves.add(leaves3);
    const x = position[0] -85;
    const y = position[1] + this.drumStackY + this.drumStackHeight - 50;
    const z =position[2] - 40;
    leaves.position.set(x, y, z);
    leaves.name = 'leafBlock';
    // leaves.receiveShadow = true;
    this.scene.children.filter(obj => (
      obj.name === 'leafBlock'
    )).forEach(el => this.scene.remove(el));
    this.scene.add(leaves);
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
    // const geometry = new THREE.BoxBufferGeometry(
    //   this.drumStackwidth,
    //   150,
    //   this.drumStackDepth
    // );
    // const material = new THREE.MeshBasicMaterial({
    //   color: this.drumStackColors[Math.floor(Math.random()*2)]
    // });
    console.log(this.stackPosition);
    this.addBlock(this.xyposition, this.bigTrunkGeometry, this.bigTrunkDayMaterial);
    this.addLeaves(this.xyposition, this.stackPosition);
    this.stackPosition += 1;
    this.drumStackY += this.drumStackHeight;
    this.drumStackZ = this.drumStackZIncrement;
    this.drumStackZIncrement = this.drumStackZIncrement * 2;
    this.drumStackRotation += Math.PI/8;
  }

  resetStack() {
    this.drumStackY = -100;
    this.drumStackZ = 0;
    this.drumStackZIncrement = 9;
    this.drumStackPosition = 0;
    this.drumStackRotation = 0;
    this.drumStackColors = undefined;
    this.scene.children.filter(obj => (
      obj.name === 'drumBlock'
    )).forEach(el => this.scene.remove(el));
  }
}

export default BigTree;
