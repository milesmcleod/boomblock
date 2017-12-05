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
    this.mousePos = {x: 0, y: 0};
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 700;
    this.camera.position.y = 325;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
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
    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;
    this.controls.enableZoom = true;
    this.controls.zoomSpeed = 1.0;
  }

  onWindowResize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  handleMouseMove (event) {
    this.mousePos = {x: event.clientX, y: event.clientY};
  }

  constructor() {
    this.initialize();
    this.createCamera();
    this.createRenderer();
    this.createControls();
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  update () {

  }

  render () {
    this.renderer.render( this.scene, this.camera );
  }

  loop () {
    requestAnimationFrame(() => this.loop());
    this.update();
    this.render();
  }

}

export default World;
