import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

class BoomBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animator();
  }

  animator() {
    let scene,
        camera,
        controls,
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane,
        shadowLight,
        backLight,
        ambientLight,
        renderer,
        world;

    let floor;

    let height,
        width,
        windowHalfX,
        windowHalfY,
        mousePos = {x: 0, y: 0},
        dist = 0;

    function initialize () {
      scene = new THREE.Scene();
      height = window.innerHeight;
      width = window.innerWidth;
      fieldOfView = 60;
      aspectRatio = width/height;
      nearPlane = 1;
      farPlane = 20000;
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      );
      camera.position.z = 700;
      camera.position.y = 325;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  		renderer.setSize( width, height );
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.physicallyCorrectLights = true;
      world = document.getElementById('world');
      world.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);

      controls.minDistance = 0;
      controls.maxDistance = Infinity;
      controls.enableZoom = true;
      controls.zoomSpeed = 1.0;

      windowHalfX = width/2;
      windowHalfY = height/2;
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('mousemove', handleMouseMove);
      //will need a click handler
    }

    function onWindowResize () {
      height = window.innerHeight;
      width = window.innerWidth;
      windowHalfX = width / 2;
      windowHalfY = height / 2;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    function handleMouseMove (event) {
      mousePos = {x: event.clientX, y: event.clientY};
    }

    function createLights () {
      ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
      scene.add(ambientLight);
      const spotLight1 = new THREE.SpotLight( 0xffffff, 2 );
      spotLight1.position.set( 200, 500, 500 );

      spotLight1.castShadow = true;

      spotLight1.shadow.mapSize.width = 1024;
      spotLight1.shadow.mapSize.height = 1024;

      spotLight1.shadow.camera.near = 500;
      spotLight1.shadow.camera.far = 4000;
      spotLight1.shadow.camera.fov = 30;
      spotLight1.angle = Math.PI/5;

      scene.add( spotLight1 );
      //this will need to be the sun and the streetlamps and the windows
    }

    function createFloor () {
      floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(5000,5000),
        new THREE.MeshPhongMaterial({color: 0xcccccc})
      );
      floor.rotation.x = -Math.PI/2;
      floor.position.y = -180;
      floor.receiveShadow = true;
      scene.add(floor);
      //edit this
    }

    initialize();
    createFloor();
    createLights();

    // function createBlock () {
      const baseGeometry = new THREE.BoxGeometry(480, 360, 200); //width, height, depth
      const baseMaterial = new THREE.MeshPhongMaterial({
        color: 0x7F00FF,
        side: THREE.DoubleSide
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.castShadow = true;
			base.receiveShadow = true;

      const reelGeometry = new THREE.CylinderGeometry(60, 60, 40, 32);
      const reelMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide
      });

      const spokeGeometry = new THREE.BoxGeometry(12, 50, 1); //width, height, depth
      const spokeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      });

      const ringGeometry = new THREE.RingGeometry( 50, 70, 32 );
      const ringMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );

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

      const frontLeftRing = new THREE.Mesh( ringGeometry, ringMaterial );
      frontLeftRing.position.set(-140, 160, 141);
      const backLeftRing = new THREE.Mesh( ringGeometry, ringMaterial );
      backLeftRing.position.set(-140, 160, 99);

      const leftReel = new THREE.Group();
      leftReel.add(reelLeft);
      leftReel.add(spokeL1);
      leftReel.add(spokeL2);
      leftReel.add(spokeL3);
      leftReel.add(frontLeftRing);
      leftReel.add(backLeftRing);
      leftReel.position.y = 20;
      leftReel.position.x = 40;
      leftReel.position.z = 2;

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

      const rightReel = new THREE.Group();
      rightReel.add(reelRight);
      rightReel.add(spokeR1);
      rightReel.add(spokeR2);
      rightReel.add(spokeR3);
      rightReel.add(frontRightRing);
      rightReel.add(backRightRing);
      rightReel.position.y = 20;
      rightReel.position.x = 40;
      rightReel.position.z = 2; // reels and spokes

      const trackButtonGeometry = new THREE.BoxGeometry(50, 50, 20);
      const trackButtonMaterial = new THREE.MeshPhongMaterial({
        color: 0xfffff,
        side: THREE.DoubleSide
      });
      const trackButton1 = new THREE.Mesh(
        trackButtonGeometry,
        trackButtonMaterial
      );
      const trackButton2 = new THREE.Mesh(
        trackButtonGeometry,
        trackButtonMaterial
      );
      const trackButton3 = new THREE.Mesh(
        trackButtonGeometry,
        trackButtonMaterial
      );
      const trackButton4 = new THREE.Mesh(
        trackButtonGeometry,
        trackButtonMaterial
      );
      // trackButton1.material.uniforms.transparent = true;
      // trackButton1.material.uniforms.opacity = 0.3;
      trackButton1.position.set(175, 100, 110);
      trackButton2.position.set(175, 30, 110);
      trackButton3.position.set(175, -40, 110);
      trackButton4.position.set(175, -110, 110); // track buttons

      const playButtonGeometry = new THREE.CylinderGeometry(30, 30, 20, 32);
      const playButtonMaterial = new THREE.MeshPhongMaterial({
        color: 0xfffff,
        side: THREE.DoubleSide
      });

      const playButton = new THREE.Mesh(
        playButtonGeometry,
        playButtonMaterial
      );
      playButton.position.set(-180, -10, 110);
      playButton.rotation.x = Math.PI/2;

      const pauseButton = new THREE.Mesh(
        playButtonGeometry,
        playButtonMaterial
      );
      pauseButton.position.set(-100, -10, 110);
      pauseButton.rotation.x = Math.PI/2;

      const resetButton = new THREE.Mesh(
        playButtonGeometry,
        playButtonMaterial
      );
      resetButton.position.set(-20, -10, 110);
      resetButton.rotation.x = Math.PI/2;

      const muteButton = new THREE.Mesh(
        playButtonGeometry,
        playButtonMaterial
      );
      muteButton.position.set(60, -10, 110);
      muteButton.rotation.x = Math.PI/2;

      const freqBarGeometry = new THREE.BoxGeometry(20, 90, 20);
      const freqBarMaterial = new THREE.MeshPhongMaterial({
        color: 0xfffff,
        side: THREE.DoubleSide
      });

      const tapeReaderGeometry = new THREE.BoxGeometry(100, 40, 60);
      const tapeReaderMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      });

      const tapeReader = new THREE.Mesh(
        tapeReaderGeometry,
        tapeReaderMaterial
      );
      tapeReader.position.set(-20, 70, 110);


      const boombox = new THREE.Group();
      boombox.add(base);
      boombox.add(leftReel);
      boombox.add(rightReel);
      boombox.add(trackButton1);
      boombox.add(trackButton2);
      boombox.add(trackButton3);
      boombox.add(trackButton4);
      boombox.add(playButton);
      boombox.add(pauseButton);
      boombox.add(resetButton);
      boombox.add(muteButton);
      for (let i = 0; i < 12; i++ ) {
        const bar = new THREE.Mesh(
          freqBarGeometry,
          freqBarMaterial
        );
        bar.position.set(-195 + i * 25, -110, 110);
        boombox.add(bar);
      }
      boombox.add(tapeReader);
      scene.add(boombox);
    // }

    const trackGeometry = new THREE.BoxGeometry(10000, 50, 200);
    const trackMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    const trainTrack = new THREE.Mesh(trackGeometry, trackMaterial);
    trainTrack.position.set(0, 100, -300);
    scene.add(trainTrack);

    // 4 more buildings needed here. need to increase height of boomblock

    function update () {

    }

    function render () {
      renderer.render( scene, camera );
    }

		function loop () {
			requestAnimationFrame( loop );
      update();
			render();
		}

    loop();

  }

  render () {
    return (
      <div id="world" className="world"></div>
    );
  }
}

export default BoomBlock;
