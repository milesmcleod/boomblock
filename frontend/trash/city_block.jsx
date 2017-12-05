import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

class CityBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animator();
  }

  animator() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
    const cityBlock = document.getElementById('world');
		cityBlock.appendChild( renderer.domElement );

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = (width/height);
      camera.updateProjectionMatrix();
    });

    const floorGeometry = new THREE.BoxGeometry(10, 1, 10);
    const floorMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -5;
    scene.add(floor);

    //create shape
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2); //width, depth, height
    const cubeMaterials = [
      new THREE.MeshLambertMaterial({color: 0x7F00FF, side: THREE.DoubleSide}),
      new THREE.MeshLambertMaterial({color: 0x600728, side: THREE.DoubleSide}),
      new THREE.MeshLambertMaterial({color: 0xDC3C6D, side: THREE.DoubleSide}),
      new THREE.MeshPhongMaterial({color: 0x62E9BB, side: THREE.DoubleSide}),
      new THREE.MeshPhongMaterial({color: 0xFC6459, side: THREE.DoubleSide}),
      new THREE.MeshPhongMaterial({color: 0xCD0D14, side: THREE.DoubleSide}),
    ];

    //create a material, color, or image texture
    // const material = new THREE.MeshFaceMaterial(cubeMaterials);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    scene.add(cube);

    //logic
    const update = () => {
    };

    //draw scene
    const render = () => {
      renderer.render( scene, camera );
    };

    //run game loop (update, render, repeat)
		const animate = function () {
			requestAnimationFrame( animate ); // do this every frame
      update();
			render();
		};

    animate();

  }

  render () {
    return (
      <div id="city-block" className="world"></div>
    );
  }
}

export default CityBlock;
