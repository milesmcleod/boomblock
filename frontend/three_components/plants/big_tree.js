import * as THREE from 'three';
import * as Leaves from'./tree_geometries';

class BigTree {
  constructor(xyposition, audio, scene, type, id) {
    this.id = id;
    this.audio = audio;
    this.scene = scene;
    this.xyposition = xyposition;
    this.drumStackY = -100;
    this.drumStackZ = 0;
    this.drumStackZIncrement = 40;
    this.xRotation = false;
    if (type === 1) {
      this.drumStackWidth = 150;
      this.drumStackHeight = 75;
      this.drumStackDepth = 150;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
    } else if (type === 2) {
      this.drumStackWidth = 100;
      this.drumStackHeight = 100;
      this.drumStackDepth = 100;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
      this.xRotation = true;
      this.arcRotation = 3 * Math.PI/2;
      this.arcRadius = 350;
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
    this.bigTrunkDayMaterial = new THREE.MeshPhongMaterial({
      color: 0x623b00
    });
    this.leafMaterial = new THREE.MeshPhongMaterial({
      color: 0x00c563,
      side: THREE.DoubleSide,
      reflectivity: 0.1,
      shininess: 5,
      lightMapIntensity: 0.3
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
    drumBlock.name = 'drumBlock' + this.id;
    const x = position[0];
    let y = position[1] + this.drumStackY;
    let z = position[2];
    if (this.xRotation) {
      y = position[1] + this.arcRadius * (Math.cos(this.arcRotation));
      z = position[2] + this.arcRadius * (Math.sin(this.arcRotation));
    }
    drumBlock.position.set(x, y, z);
    if (this.xRotation) {
      drumBlock.rotateX(this.arcRotation);
      drumBlock.rotateZ(this.drumStackRotation);
      this.arcRotation += Math.PI/12;
    } else {
      drumBlock.rotateY(this.drumStackRotation);
    }
    // drumBlock.rotateY(this.drumStackRotation);
    this.scene.add(drumBlock);
  }

  addLeaves(position, stackPosition) {
    let leafSize = this.leafRatios[stackPosition % 8];
    const geometries = Leaves.buildBigLeaves1(leafSize);
    const leaves1 = new THREE.Mesh(geometries[0], this.leafMaterial);
    const leaves2 = new THREE.Mesh(geometries[1], this.leafMaterial);
    const leaves3 = new THREE.Mesh(geometries[2], this.leafMaterial);
    const leaves = new THREE.Group();
    leaves.add(leaves1);
    leaves.add(leaves2);
    leaves.add(leaves3);
    const x = position[0];
    let y = position[1] + this.drumStackY + this.drumStackHeight - 50;
    let z =position[2];
    if (this.xRotation) {
      y = position[1] + this.arcRadius * (Math.cos(this.arcRotation));
      z = position[2] + this.arcRadius * (Math.sin(this.arcRotation));
    }
    leaves.position.set(x, y, z);
    if (this.xRotation) {
      leaves.rotateY(this.drumStackRotation);
    } else {
      leaves.rotateY(this.drumStackRotation);
    }
    leaves.name = 'leafBlock' + this.id;
    // leaves.receiveShadow = true;
    this.scene.children.filter(obj => (
      obj.name === 'leafBlock' + this.id
    )).forEach(el => this.scene.remove(el));
    leaves.rotateY(this.drumStackRotation);
    this.scene.add(leaves);
  }

  stack() {
    // const rainbow = [
    //   0xcc0000,
    //   0xff3300,
    //   0xff9933,
    //   0xffcc00,
    //   0xffff00,
    //   0x66ff33,
    //   0x66ff66,
    //   0x00ff99,
    //   0x00ccff,
    //   0x0066ff,
    //   0x7f00ff,
    //   0xff00ff
    // ];
    // if (!this.drumStackColors) {
    //   this.drumStackColors = [
    //     rainbow[Math.floor(Math.random()*12)],
    //     rainbow[Math.floor(Math.random()*12)]
    //   ];
    // }
    // const material = new THREE.MeshBasicMaterial({
    //   color: this.drumStackColors[Math.floor(Math.random()*2)]
    // }); //this should be triggered if night mode is engaged
    this.addBlock(
      this.xyposition,
      this.bigTrunkGeometry,
      this.bigTrunkDayMaterial
    );
    this.addLeaves(this.xyposition, this.stackPosition);
    this.stackPosition += 1;
    this.drumStackY += this.drumStackHeight;
    this.drumStackZ = this.drumStackZIncrement;
    this.drumStackZIncrement = this.drumStackZIncrement + 40;
    this.drumStackRotation += Math.PI/4;
  }

  resetStack() {
    this.drumStackY = -100;
    this.drumStackZ = 0;
    this.drumStackZIncrement = 9;
    this.stackPosition = 0;
    this.drumStackRotation = 0;
    this.drumStackColors = undefined;
    this.scene.children.filter(obj => (
      obj.name === 'drumBlock' + this.id || obj.name === 'leafBlock' + this.id
    )).forEach(el => this.scene.remove(el));
    if (this.xRotation) {
      this.arcRotation = 3 * Math.PI/2;
    }
  }
}

export default BigTree;
