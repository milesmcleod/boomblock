import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

class World {
  initialize () {
    this.scene = new THREE.Scene();
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.fieldOfView = 60;
    this.aspectRatio = this.width/this.height;
    this.nearPlane = 1;
    this.farPlane = 20000;
    this.fps = 50;
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set(0, 200, 1800);
    this.camera.lookAt(0, 300, 0);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setSize( this.width, this.height );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.world = document.getElementById('world');
    this.world.appendChild(this.renderer.domElement);
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 750;
    this.controls.maxDistance = 4000;
    this.controls.enableZoom = true;
    this.controls.zoomSpeed = 1.0;
  }

  createRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  handleWindowResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  handleMouseMove(event) {
  	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  constructor() {
    this.initialize();
    this.createCamera();
    this.createRenderer();
    this.createControls();
    this.createRaycaster();
    window.addEventListener('resize', this.handleWindowResize.bind(this), false);
    window.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  update (audio) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const boomBlockObject = this.scene.children.filter(obj => obj.name === 'boombox')[0];
    this.intersects = this.raycaster.intersectObjects(boomBlockObject.children);
    //
    audio.masterAnalyser.getByteFrequencyData(audio.masterDataArray);
    const bars = boomBlockObject.children.filter(obj => obj.name.match('bar'));
    for (let i = 0; i < bars.length; i++ ) {
      if(!bars[i].geometry.boundingBox) bars[i].geometry.computeBoundingBox();
      const height = bars[i].geometry.boundingBox.max.y - bars[i].geometry.boundingBox.min.y;
      //from https://stackoverflow.com/questions/33454919/scaling-a-three-js-geometry-only-up
      bars[i].position.y = -150 ;
      if (audio.masterDataArray[i] > 0) {
        bars[i].position.y = (height * audio.masterDataArray[i]/300 / 2) - 150 ;
        bars[i].scale.y = audio.masterDataArray[i]/300;
      } else {
        bars[i].scale.y = 0.00001;
      }
    }
    //
    const reels = this.scene.children.filter(obj => obj.name.match("reel"));
    reels.forEach(el => {
      if (audio.playing) {
        el.rotateZ(-0.04);
      } else if (audio.resetting) {
        el.rotateZ(0.5);
      }
    }); //rotateOnAxis function

  }

  //7: (12), 1: (15, 14, 13), 2: (17, 18), 3: (27, 28) 4: (32, 31, 30, 29) 5: (35, 34)

  render () {
    this.renderer.render( this.scene, this.camera );
  }

  // original loop:

  // loop (audio) {
  //   requestAnimationFrame(() => this.loop(audio));
  //   this.update(audio);
  //   this.render();
  // }

  //slowed loop:

  loop(audio) {
    setTimeout(() => {
      this.update(audio);
      this.render();
      requestAnimationFrame(() => this.loop(audio));
    }, 1000/this.fps);
  }

}

export default World;
