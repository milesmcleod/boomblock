import * as THREE from 'three';

class BoomBlock {
  createBase(boombox) {
    const baseGeometry = new THREE.BoxGeometry(480, 360, 200);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x7F00FF,
      side: THREE.DoubleSide
    });
    this.base = new THREE.Mesh(baseGeometry, baseMaterial);
    this.base.castShadow = true;
    this.base.receiveShadow = true;
    boombox.add(this.base);

    const tapeReaderGeometry = new THREE.BoxGeometry(100, 40, 60);
    const tapeReaderMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    this.tapeReader = new THREE.Mesh(
      tapeReaderGeometry,
      tapeReaderMaterial
    );
    this.tapeReader.position.set(-20, 70, 110);
    boombox.add(this.tapeReader);
  }

  createReels(boombox) {
    const reelGeometry = new THREE.CylinderGeometry(60, 60, 40, 32);
    const reelMaterial = new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide
    });

    const spokeGeometry = new THREE.BoxGeometry(12, 50, 1);
    const spokeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    const ringGeometry = new THREE.RingGeometry( 50, 70, 32 );
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    const reelLeft = new THREE.Mesh(reelGeometry, reelMaterial);
    reelLeft.position.x = -140;
    reelLeft.position.y = 160;
    reelLeft.position.z = 120;
    reelLeft.rotation.x = Math.PI/2;

    const spokeL1 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeL1.position.set( -140, 190, 140 );
    const spokeL2 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeL2.position.set( -114, 144, 140 );
    spokeL2.rotation.z = Math.PI/3;
    const spokeL3 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeL3.position.set( -166, 144, 140 );
    spokeL3.rotation.z = 2 * Math.PI/3;

    const frontLeftRing = new THREE.Mesh(ringGeometry, ringMaterial);
    frontLeftRing.position.set(-140, 160, 141);
    const backLeftRing = new THREE.Mesh(ringGeometry, ringMaterial);
    backLeftRing.position.set(-140, 160, 99);

    this.leftReel = new THREE.Group();
    this.leftReel.add(reelLeft);
    this.leftReel.add(spokeL1);
    this.leftReel.add(spokeL2);
    this.leftReel.add(spokeL3);
    this.leftReel.add(frontLeftRing);
    this.leftReel.add(backLeftRing);
    this.leftReel.position.y = 20;
    this.leftReel.position.x = 40;
    this.leftReel.position.z = 2;

    boombox.add(this.leftReel);

    const reelRight = new THREE.Mesh(reelGeometry, reelMaterial);
    reelRight.position.x = 25;
    reelRight.position.y = 160;
    reelRight.position.z = 120;
    reelRight.rotation.x = Math.PI/2;

    const spokeR1 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeR1.position.set( 25, 190, 140 );
    const spokeR2 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeR2.position.set( 51, 144, 140 );
    spokeR2.rotation.z = Math.PI/3;
    const spokeR3 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeR3.position.set( -1, 144, 140 );
    spokeR3.rotation.z = 2 * Math.PI/3;

    const frontRightRing = new THREE.Mesh( ringGeometry, ringMaterial );
    frontRightRing.position.set(25, 160, 141);
    const backRightRing = new THREE.Mesh( ringGeometry, ringMaterial );
    backRightRing.position.set(25, 160, 99);

    this.rightReel = new THREE.Group();
    this.rightReel.add(reelRight);
    this.rightReel.add(spokeR1);
    this.rightReel.add(spokeR2);
    this.rightReel.add(spokeR3);
    this.rightReel.add(frontRightRing);
    this.rightReel.add(backRightRing);
    this.rightReel.position.y = 20;
    this.rightReel.position.x = 40;
    this.rightReel.position.z = 2;

    boombox.add(this.rightReel);
  }

  createTrackButtons(boombox) {
    const trackButtonGeometry = new THREE.BoxGeometry(50, 50, 20);
    const trackButtonMaterial = new THREE.MeshPhongMaterial({
      color: 0xfffff,
      side: THREE.DoubleSide
    });
    this.trackButton1 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial
    );
    this.trackButton2 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial
    );
    this.trackButton3 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial
    );
    this.trackButton4 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial
    );
    // trackButton1.material.uniforms.transparent = true;
    // trackButton1.material.uniforms.opacity = 0.3;
    this.trackButton1.position.set(175, 100, 110);
    this.trackButton2.position.set(175, 30, 110);
    this.trackButton3.position.set(175, -40, 110);
    this.trackButton4.position.set(175, -110, 110);

    boombox.add(this.trackButton1);
    boombox.add(this.trackButton2);
    boombox.add(this.trackButton3);
    boombox.add(this.trackButton4);
  }

  createPlayButtons(boombox) {
    const playButtonGeometry = new THREE.CylinderGeometry(30, 30, 20, 32);
    const playButtonMaterial = new THREE.MeshPhongMaterial({
      color: 0xfffff,
      side: THREE.DoubleSide
    });

    this.playButton = new THREE.Mesh(
      playButtonGeometry,
      playButtonMaterial
    );
    this.playButton.position.set(-180, -10, 110);
    this.playButton.rotation.x = Math.PI/2;

    this.pauseButton = new THREE.Mesh(
      playButtonGeometry,
      playButtonMaterial
    );
    this.pauseButton.position.set(-100, -10, 110);
    this.pauseButton.rotation.x = Math.PI/2;

    this.resetButton = new THREE.Mesh(
      playButtonGeometry,
      playButtonMaterial
    );
    this.resetButton.position.set(-20, -10, 110);
    this.resetButton.rotation.x = Math.PI/2;

    this.muteButton = new THREE.Mesh(
      playButtonGeometry,
      playButtonMaterial
    );
    this.muteButton.position.set(60, -10, 110);
    this.muteButton.rotation.x = Math.PI/2;

    boombox.add(this.playButton);
    boombox.add(this.pauseButton);
    boombox.add(this.resetButton);
    boombox.add(this.muteButton);
  }

  createFrequencyVisualizer(boombox) {
    const freqBarGeometry = new THREE.BoxGeometry(20, 90, 20);
    const freqBarMaterial = new THREE.MeshPhongMaterial({
      color: 0xfffff,
      side: THREE.DoubleSide
    });
    for (let i = 1; i < 13; i++ ) {
      this[`bar${i}`] = new THREE.Mesh(
        freqBarGeometry,
        freqBarMaterial
      );
      this[`bar${i}`].position.set(-195 + ((i-1) * 25), -110, 110);
      boombox.add(this[`bar${i}`]);
    }
  }

  constructor(scene) {
    this.boombox = new THREE.Group();
    this.createBase(this.boombox);
    this.createReels(this.boombox);
    this.createTrackButtons(this.boombox);
    this.createPlayButtons(this.boombox);
    this.createFrequencyVisualizer(this.boombox);
    scene.add(this.boombox);
  }
}

export default BoomBlock;
