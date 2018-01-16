import * as THREE from 'three';

class Materials {
  constructor() {
    this.trunkColors = undefined;
    this.rainbow = [
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
  }

  trunkMaterial(mode) {
    if (mode === 'dayTime') {
      return new THREE.MeshPhongMaterial({
        color: 0x623b00
      });
    } else {
      if (!this.trunkColors) {
        this.trunkColors = [
          this.rainbow[Math.floor(Math.random()*12)],
          this.rainbow[Math.floor(Math.random()*12)]
        ];
      }
      return new THREE.MeshPhongMaterial({
        color: this.trunkColors[Math.floor(Math.random()*2)]
      });
    }
  }

  clearTrunkMaterials() {
    this.trunkColors = undefined;
  }

  leafMaterial(mode) {
    if (mode === 'dayTime') {
      return new THREE.MeshPhongMaterial({
        color: 0x00c563,
        side: THREE.DoubleSide,
        reflectivity: 0.1,
        shininess: 5,
        lightMapIntensity: 0.3
      });
    } else {
      return new THREE.MeshPhongMaterial({
        color: 0x00c563,
        side: THREE.DoubleSide,
        reflectivity: 0.1,
        shininess: 5,
        lightMapIntensity: 0.3
      });
    }
  }
}

export default Materials;
