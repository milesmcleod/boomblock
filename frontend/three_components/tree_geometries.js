import * as THREE from 'three';

export const trunkBlockGeometry = new THREE.BoxBufferGeometry(
  150,
  150,
  150
);

const smallLeafShift = new THREE.Matrix4().makeScale(150, 150, 150 );
const smallLeafFaces = [
    new THREE.Face3( 0, 1, 2 ),
    new THREE.Face3( 0, 2, 3 ),
    new THREE.Face3( 0, 1, 3 ),
    new THREE.Face3( 1, 2, 3 )
];

export const smallLeaves1Geometry = new THREE.Geometry();

smallLeaves1Geometry.vertices = [
  new THREE.Vector3( 0, 0, 0 ),
  new THREE.Vector3( 1, 0, 0 ),
  new THREE.Vector3( 0.5, 1, -1 ),
  new THREE.Vector3( 0.5, 0.5, 0.5 )
];

export const smallLeaves2Geometry = new THREE.Geometry();

smallLeaves2Geometry.vertices = [
  new THREE.Vector3( 0, 0, 0 ),
  new THREE.Vector3( .5, 0, 1  ),
  new THREE.Vector3( -1, 1.2, 1.5 ),
  new THREE.Vector3( 0.5, 0.5, 0.5 )
];

export const smallLeaves3Geometry = new THREE.Geometry();

smallLeaves3Geometry.vertices = [
  new THREE.Vector3( 1, 0, 0 ),
  new THREE.Vector3( .5, 0, 1  ),
  new THREE.Vector3( 2, 1, 1.5 ),
  new THREE.Vector3( 0.5, 0.5, 0.5 )
];

smallLeaves1Geometry.faces = smallLeafFaces;
smallLeaves1Geometry.applyMatrix(smallLeafShift);
smallLeaves2Geometry.faces = smallLeafFaces;
smallLeaves2Geometry.applyMatrix(smallLeafShift);
smallLeaves3Geometry.faces = smallLeafFaces;
smallLeaves3Geometry.applyMatrix(smallLeafShift);

export const bigLeavesGeometry = new THREE.Geometry();
