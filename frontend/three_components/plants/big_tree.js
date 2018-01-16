import * as THREE from 'three';
import * as Leaves from'./tree_geometries';


class BigTree {
  constructor(materials, xyposition, audio, scene, type, id) {
    this.materials = materials;
    this.mode = undefined;
    this.id = id;
    this.audio = audio;
    this.scene = scene;
    this.xyposition = xyposition;
    this.drumStackY = -100;
    this.drumStackZ = 0;
    this.drumStackZIncrement = 40;
    this.xRotation = false;
    if (type === 1) {
      this.drumStackWidth = type === 1 ? 150 : 135;
      this.drumStackHeight = type === 1 ? 75 : 135;
      this.drumStackDepth = type === 1 ? 150 : 135;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
    } else if (type === 2) {
      this.drumStackWidth = 100;
      this.drumStackHeight = 100;
      this.drumStackDepth = 100;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
      this.xRotation = true;
      this.arcRotation = 3 * Math.PI/2;
      this.arcRadius = 350;
      this.yRotationShift = Math.PI/6;
    } else if (type === 3) {
      this.drumStackWidth = 100;
      this.drumStackHeight = 100;
      this.drumStackDepth = 100;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
      this.xRotation = true;
      this.arcRotation = 3 * Math.PI/2;
      this.arcRadius = 350;
      this.yRotationShift = 4 * Math.PI/6;
    }else if (type === 4) {
      this.drumStackWidth = 140;
      this.drumStackHeight = 140;
      this.drumStackDepth = 140;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
      this.xRotation = true;
      this.arcRotation = 3 * Math.PI/2;
      this.arcRadius = 550;
      this.yRotationShift = 10 * Math.PI/6;
    } else if (type === 5) {
      this.drumStackWidth = 140;
      this.drumStackHeight = 140;
      this.drumStackDepth = 140;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
      this.xRotation = true;
      this.arcRotation = 3 * Math.PI/2;
      this.arcRadius = 550;
      this.yRotationShift = Math.PI/3;
    } else if (type === 6) {
      this.drumStackWidth = 140;
      this.drumStackHeight = 140;
      this.drumStackDepth = 140;
      this.leafRatios = [120, 140, 160, 180, 200, 220, 240, 260];
      this.xRotation = true;
      this.arcRotation = 3 * Math.PI/2;
      this.arcRadius = 500;
      this.yRotationShift = 9 * Math.PI/6;
    }
    this.drumStackRotation = this.xRotation ? this.yRotationShift : 0;
    this.drumStackColors = undefined;
    this.intervalId = undefined;
    this.timeoutIds = [];
    this.stackPosition = 0;
    this.bigTrunkGeometry = new THREE.BoxBufferGeometry(
      this.drumStackWidth,
      this.drumStackHeight,
      this.drumStackDepth
    );
    this.leafMaterial = new THREE.MeshPhongMaterial({
      color: 0x00c563,
      side: THREE.DoubleSide,
      reflectivity: 0.1,
      shininess: 5,
      lightMapIntensity: 0.3
    });
  }

  injectMode(mode) {
    this.mode = mode;
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
    let x = position[0];
    let y = position[1] + this.drumStackY;
    let z = position[2];
    if (this.xRotation) {
      const r = this.arcRadius * Math.sin(this.arcRotation);
      x = position[0] + (r * Math.sin(this.yRotationShift) * -1);
      y = position[1] + (this.arcRadius * (Math.cos(this.arcRotation)));
      z = position[2] + (r * Math.cos(this.yRotationShift));
    }
    drumBlock.position.set(x, y, z);
    if (this.xRotation) {
      let rotation;
      if (this.stackPosition % 2 === 0) {
        rotation = this.yRotationShift;
        x = Math.cos(rotation);
        y = 0;
        z = Math.sin(rotation);
      } else {
        rotation = this.yRotationShift;
        x = Math.cos(rotation);
        y = 0;
        z = Math.sin(rotation);
        rotation = this.drumStackRotation;
      }

      const newAxisX = new THREE.Vector3(x, y, z).normalize();
      const rotationX = this.arcRotation + Math.PI/2;

      const newAxisY = new THREE.Vector3(0, 1, 0).normalize();
      const rotationY = -1 * rotation;

      let quaternionY = new THREE.Quaternion();
      quaternionY.setFromAxisAngle(newAxisY, rotationY);


      let quaternionX = new THREE.Quaternion();
      quaternionX.setFromAxisAngle(newAxisX, rotationX);

      drumBlock.applyQuaternion(quaternionY);
      drumBlock.applyQuaternion(quaternionX);



      this.arcRotation += Math.PI/12;
    } else {
      drumBlock.rotateY(this.drumStackRotation);
    }
    this.scene.add(drumBlock);
  }

  addLeaves(position, stackPosition, mode) {
    let leafSize = this.leafRatios[stackPosition % 8];
    const geometries = Leaves.buildBigLeaves1(leafSize);
    const material = this.materials.leafMaterial(mode);
    const leaves1 = new THREE.Mesh(geometries[0], material);
    const leaves2 = new THREE.Mesh(geometries[1], material);
    const leaves3 = new THREE.Mesh(geometries[2], material);
    const leaves = new THREE.Group();
    leaves.add(leaves1);
    leaves.add(leaves2);
    leaves.add(leaves3);
    let x = position[0];
    let y = position[1] + this.drumStackY + this.drumStackHeight - 50;
    let z =position[2];
    if (this.xRotation) {
      const r = this.arcRadius * Math.sin(this.arcRotation);
      x = position[0] + (r * Math.sin(this.yRotationShift) * -1);
      y = position[1] + (this.arcRadius * (Math.cos(this.arcRotation)));
      z = position[2] + (r * Math.cos(this.yRotationShift));
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
    this.addBlock(
      this.xyposition,
      this.bigTrunkGeometry,
      this.materials.trunkMaterial(this.mode)
    );
    this.addLeaves(this.xyposition, this.stackPosition, this.mode);
    this.stackPosition += 1;
    this.drumStackY += this.drumStackHeight;
    this.drumStackZ = this.drumStackZIncrement;
    this.drumStackZIncrement = this.drumStackZIncrement + 40;
    this.drumStackRotation += Math.PI/4;
  }

  resetStack() {
    this.materials.clearTrunkMaterials();
    this.drumStackY = -100;
    this.drumStackZ = 0;
    this.drumStackZIncrement = 9;
    this.stackPosition = 0;
    this.drumStackRotation = this.xRotation ? this.yRotationShift : 0;
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
