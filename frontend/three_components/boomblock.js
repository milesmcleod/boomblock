import * as THREE from 'three';

class BoomBlock {
  createBase(boombox) {
    const baseGeometry = new THREE.BoxBufferGeometry(480, 360, 200);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    this.base = new THREE.Mesh(baseGeometry, baseMaterial);
    this.base.castShadow = true;
    this.base.receiveShadow = true;
    boombox.add(this.base);

    const tapeReaderGeometry = new THREE.BoxBufferGeometry(100, 40, 60);
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

  createReels(scene) {
    const reelGeometry = new THREE.CylinderBufferGeometry(60, 60, 40, 32);
    const reelMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    });
    const miniReelGeometry = new THREE.CylinderBufferGeometry(20, 20, 60, 32);

    const spokeGeometry = new THREE.BoxBufferGeometry(12, 50, 1);
    const spokeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    const ringGeometry = new THREE.RingGeometry( 50, 70, 32 );
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    const reelLeft = new THREE.Mesh(reelGeometry, reelMaterial);
    reelLeft.rotateX(Math.PI/2);

    const spokeL1 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeL1.position.set( 0, 32, 21 );
    const spokeL2 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeL2.position.set( 26, -12, 21 );
    spokeL2.rotation.z = Math.PI/3;
    const spokeL3 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeL3.position.set( -26, -12, 21 );
    spokeL3.rotation.z = 2 * Math.PI/3;

    const frontLeftRing = new THREE.Mesh(ringGeometry, ringMaterial);
    frontLeftRing.position.set(0, 0, 21);
    const backLeftRing = new THREE.Mesh(ringGeometry, ringMaterial);
    backLeftRing.position.set(0, 0, -21);

    const miniReelL = new THREE.Mesh(miniReelGeometry, ringMaterial);
    miniReelL.rotateX(Math.PI/2);

    this.leftReel = new THREE.Group();
    this.leftReel.add(miniReelL);
    this.leftReel.add(reelLeft);
    this.leftReel.add(spokeL1);
    this.leftReel.add(spokeL2);
    this.leftReel.add(spokeL3);
    this.leftReel.add(frontLeftRing);
    this.leftReel.add(backLeftRing);
    this.leftReel.position.set(-120, 200, 122);
    // this.leftReel.rotation.x = Math.PI/2;

    this.leftReel.name = 'reelLeft';

    scene.add(this.leftReel);

    const reelRight = new THREE.Mesh(reelGeometry, reelMaterial);
    reelRight.rotateX(Math.PI/2);

    const spokeR1 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeR1.position.set( 0, 32, 21 );
    const spokeR2 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeR2.position.set( 26, -12, 21 );
    spokeR2.rotation.z = Math.PI/3;
    const spokeR3 = new THREE.Mesh(spokeGeometry, spokeMaterial);
    spokeR3.position.set( -26, -12, 21 );
    spokeR3.rotation.z = 2 * Math.PI/3;

    const frontRightRing = new THREE.Mesh( ringGeometry, ringMaterial );
    frontRightRing.position.set(0, 0, 21);
    const backRightRing = new THREE.Mesh( ringGeometry, ringMaterial );
    backRightRing.position.set(0, 0, -21);

    const miniReelR = new THREE.Mesh(miniReelGeometry, ringMaterial);
    miniReelR.rotateX(Math.PI/2);

    this.rightReel = new THREE.Group();
    this.rightReel.add(miniReelR);
    this.rightReel.add(reelRight);
    this.rightReel.add(spokeR1);
    this.rightReel.add(spokeR2);
    this.rightReel.add(spokeR3);
    this.rightReel.add(frontRightRing);
    this.rightReel.add(backRightRing);
    this.rightReel.position.set(80, 200, 122);

    this.rightReel.name = 'reelRight';

    scene.add(this.rightReel);
  }

  createTape(boombox) {
    const tapeGeometry = new THREE.PlaneBufferGeometry(154, 80);
    const tapeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide
    });
    const tapeLeft = new THREE.Mesh(tapeGeometry, tapeMaterial);
    tapeLeft.position.set(-120, 108, 100);
    tapeLeft.rotation.x = Math.PI/2;
    tapeLeft.rotation.y = -Math.PI/3.60;
    const tapeRight = new THREE.Mesh(tapeGeometry, tapeMaterial);
    tapeRight.position.set(80, 108, 100);
    tapeRight.rotation.x = Math.PI/2;
    tapeRight.rotation.y = Math.PI/3.60;

    const tapeBottomGeometry = new THREE.PlaneBufferGeometry(101, 80);
    const tapeBottom = new THREE.Mesh(tapeBottomGeometry, tapeMaterial);
    tapeBottom.position.set(-20, 49, 100);
    tapeBottom.rotation.x = Math.PI/2;

    boombox.add(tapeLeft);
    boombox.add(tapeRight);
    boombox.add(tapeBottom);

  }

  createTrackButtons(boombox) {
    const trackButtonGeometry = new THREE.BoxBufferGeometry(50, 50, 20);
    const trackButtonMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide
    });
    const trackButtonMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide
    });
    const trackButtonMaterial3 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide
    });
    const trackButtonMaterial4 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide
    });
    this.trackButton1 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial1
    );
    this.trackButton2 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial2
    );
    this.trackButton3 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial3
    );
    this.trackButton4 = new THREE.Mesh(
      trackButtonGeometry,
      trackButtonMaterial4
    );
    // trackButton1.material.uniforms.transparent = true;
    // trackButton1.material.uniforms.opacity = 0.3;
    this.trackButton1.position.set(175, 100, 110);
    this.trackButton2.position.set(175, 30, 110);
    this.trackButton3.position.set(175, -40, 110);
    this.trackButton4.position.set(175, -110, 110);

    const light = new THREE.PointLight( 0x00ffff, 0.6, 0, 2 );
    light.position.set(175, 0, 110);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.far = 2000;
    boombox.add(light);

    this.trackButton1.name = 'track1';
    this.trackButton2.name = 'track2';
    this.trackButton3.name = 'track3';
    this.trackButton4.name = 'track4';

    boombox.add(this.trackButton1);
    boombox.add(this.trackButton2);
    boombox.add(this.trackButton3);
    boombox.add(this.trackButton4);
  }

  createPlayButtons(boombox) {
    const playButtonGeometry = new THREE.CylinderBufferGeometry(30, 30, 20, 32);
    const playButtonMaterial = new THREE.MeshBasicMaterial({
      color: 0x66ff66,
      side: THREE.DoubleSide
    });
    const pauseButtonMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    });
    const resetButtonMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });
    const muteButtonMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide
    });

    this.playButton = new THREE.Mesh(
      playButtonGeometry,
      playButtonMaterial
    );
    this.playButton.position.set(-180, -10, 110);
    this.playButton.rotation.x = Math.PI/2;

    const coneGeometry = new THREE.ConeGeometry(16, 24, 2);
    const labelMaterial = new THREE.MeshBasicMaterial( {color: 0x343434} );
    const cone = new THREE.Mesh( coneGeometry, labelMaterial );
    cone.position.set(-176, -10, 121);
    cone.rotateX(-Math.PI/2);
    cone.rotateZ(-Math.PI/2);
    cone.name = 'play';
    boombox.add( cone );

    this.pauseButton = new THREE.Mesh(
      playButtonGeometry,
      pauseButtonMaterial
    );
    this.pauseButton.position.set(-100, -10, 110);
    this.pauseButton.rotation.x = Math.PI/2;

    const pausePlaneGeometry = new THREE.PlaneBufferGeometry(25, 9);
    const pauseLeft = new THREE.Mesh(pausePlaneGeometry, labelMaterial);
    pauseLeft.position.set(-106, -10, 121);
    pauseLeft.rotateZ(Math.PI/2);
    const pauseRight = new THREE.Mesh(pausePlaneGeometry, labelMaterial);
    pauseRight.position.set(-94, -10, 121);
    pauseRight.rotateZ(Math.PI/2);
    pauseLeft.name = 'pause';
    pauseRight.name = 'pause';
    boombox.add(pauseLeft);
    boombox.add(pauseRight);

    this.resetButton = new THREE.Mesh(
      playButtonGeometry,
      resetButtonMaterial
    );
    this.resetButton.position.set(-20, -10, 110);
    this.resetButton.rotation.x = Math.PI/2;

    const rewindGeometry = new THREE.ConeGeometry(12, 18, 2);
    const cone1 = new THREE.Mesh( rewindGeometry, labelMaterial );
    cone1.position.set(-12, -10, 121);
    cone1.rotateX(-Math.PI/2);
    cone1.rotateZ(Math.PI/2);
    cone1.name = 'reset';
    boombox.add(cone1);
    const cone2 = new THREE.Mesh( rewindGeometry, labelMaterial );
    cone2.position.set(-25, -10, 121);
    cone2.rotateX(-Math.PI/2);
    cone2.rotateZ(Math.PI/2);
    cone2.name = 'reset';
    boombox.add(cone2);
    const resetPlaneGeometry = new THREE.PlaneBufferGeometry(24, 5);
    const resetBar = new THREE.Mesh(resetPlaneGeometry, labelMaterial);
    resetBar.position.set(-33, -10, 121);
    resetBar.rotateZ(Math.PI/2);
    resetBar.name = 'reset';
    boombox.add(resetBar);

    this.muteButton = new THREE.Mesh(
      playButtonGeometry,
      muteButtonMaterial
    );
    this.muteButton.position.set(60, -10, 110);
    this.muteButton.rotation.x = Math.PI/2;


    const cone3 = new THREE.Mesh( coneGeometry, labelMaterial );
    cone3.position.set(51, -10, 121);
    cone3.rotateX(-Math.PI/2);
    cone3.rotateZ(Math.PI/2);
    cone3.name = 'mute';
    boombox.add(cone3);
    const mutePlaneGeometry = new THREE.PlaneBufferGeometry(14, 14);
    const mutePlane = new THREE.Mesh(mutePlaneGeometry, labelMaterial);
    mutePlane.position.set(44, -10, 121);
    mutePlane.name = 'mute';
    boombox.add(mutePlane);
    const mutePlane2Geometry = new THREE.PlaneBufferGeometry(16, 3);
    const mutePlaneX1 = new THREE.Mesh(mutePlane2Geometry, labelMaterial);
    mutePlaneX1.position.set(70, -10, 121);
    mutePlaneX1.rotateZ(Math.PI/4);
    mutePlaneX1.name = 'mute';
    boombox.add(mutePlaneX1);
    const mutePlaneX2 = new THREE.Mesh(mutePlane2Geometry, labelMaterial);
    mutePlaneX2.position.set(70, -10, 121);
    mutePlaneX2.rotateZ(-Math.PI/4);
    mutePlaneX2.name = 'mute';
    boombox.add(mutePlaneX2);


    this.playButton.name = 'play';
    this.pauseButton.name = 'pause';
    this.resetButton.name = 'reset';
    this.muteButton.name = 'muteButton';

    const playLight = new THREE.PointLight( 0x66ff66, 0.7, 0, 2 );
    playLight.position.set(-180, -10, 150);
    const pauseLight = new THREE.PointLight( 0xff0000, 0.7, 0, 2 );
    pauseLight.position.set(-100, -10, 150);
    const resetLight = new THREE.PointLight( 0xffff00, 0.7, 0, 2 );
    resetLight.position.set(-20, -10, 150);
    const muteLight = new THREE.PointLight( 0x0000ff, 0.7, 0, 2 );
    muteLight.position.set(60, -10, 150);

    [playLight, pauseLight, resetLight, muteLight].forEach(light => {
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      light.shadow.camera.far = 2000;
      boombox.add(light);
    });

    boombox.add(this.playButton);
    boombox.add(this.pauseButton);
    boombox.add(this.resetButton);
    boombox.add(this.muteButton);
  }

  createFrequencyVisualizer(boombox) {
    const freqBottomGeometry = new THREE.BoxBufferGeometry(310, 15, 25);
    const freqBottomMaterial = new THREE.MeshPhongMaterial({
      color: 0x343434,
      side: THREE.DoubleSide
    });
    const bottomBar = new THREE.Mesh(freqBottomGeometry, freqBottomMaterial);
    bottomBar.position.set(-58, -155, 110);
    boombox.add(bottomBar);

    const rainbowBarColors = [
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

    for (let i = 1; i < 13; i++ ) {
      const color = 0x00ffff;
      const freqBarGeometry = new THREE.BoxBufferGeometry(20, 90, 20);
      const freqBarMaterial = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide
      });
      this[`bar${i}`] = new THREE.Mesh(
        freqBarGeometry,
        freqBarMaterial
      );
      this[`bar${i}`].position.set(-195 + ((i-1) * 25), -110, 110);
      this[`bar${i}`].name = `bar${i}`;
      boombox.add(this[`bar${i}`]);
    }
  }

  constructor(scene) {
    this.boombox = new THREE.Group();
    this.createBase(this.boombox);
    this.createReels(scene);
    this.createTape(this.boombox);
    this.createTrackButtons(this.boombox);
    this.createPlayButtons(this.boombox);
    this.createFrequencyVisualizer(this.boombox);
    this.boombox.name = 'boombox';
    scene.add(this.boombox);
  }
}

export default BoomBlock;
