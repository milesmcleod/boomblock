import * as THREE from 'three';

export const trunkBlockGeometry = new THREE.BoxBufferGeometry(
  150,
  150,
  150
);

const leafShift = new THREE.Matrix4().makeScale(150, 150, 150 );
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
smallLeaves1Geometry.applyMatrix(leafShift);
smallLeaves2Geometry.faces = smallLeafFaces;
smallLeaves2Geometry.applyMatrix(leafShift);
smallLeaves3Geometry.faces = smallLeafFaces;
smallLeaves3Geometry.applyMatrix(leafShift);

const bigLeafFaces = [
    new THREE.Face3( 0, 1, 2 ),
    new THREE.Face3( 0, 1, 3 ),
    new THREE.Face3( 3, 4, 1 ),
    new THREE.Face3( 1, 2, 4 ),
    new THREE.Face3( 4, 5, 2 ),
    new THREE.Face3( 2, 0, 5 ),
    new THREE.Face3( 5, 3, 0 ),
    new THREE.Face3( 3, 4, 6 ),
    new THREE.Face3( 4, 5, 6 ),
    new THREE.Face3( 5, 3, 6 ),
];

export const bigLeaves1Geometry = new THREE.Geometry();

bigLeaves1Geometry.vertices = [
  new THREE.Vector3( 0, 0, 0 ),
  new THREE.Vector3( 1, 0, 0 ),
  new THREE.Vector3( 0.5, 0.5, 0.5 ),
  new THREE.Vector3( 0.2, 0.5, -0.9 ),
  new THREE.Vector3( 0.8, 0.5, -0.9 ),
  new THREE.Vector3( 0.5, 1, -1 ),
  new THREE.Vector3( 0.4, 0.5, -1.6)
];

export const bigLeaves2Geometry = new THREE.Geometry();

bigLeaves2Geometry.vertices = [
  new THREE.Vector3( 0, 0, 0 ),
  new THREE.Vector3( .5, 0, 1  ),
  new THREE.Vector3( -1, 1.2, 1.5 ),
  new THREE.Vector3( 0.5, 0.5, 0.5 )
];

export const bigLeaves3Geometry = new THREE.Geometry();

bigLeaves3Geometry.vertices = [
  new THREE.Vector3( 1, 0, 0 ),
  new THREE.Vector3( .5, 0, 1  ),
  new THREE.Vector3( 2, 1, 1.5 ),
  new THREE.Vector3( 0.5, 0.5, 0.5 )
];

bigLeaves1Geometry.faces = bigLeafFaces;
bigLeaves1Geometry.applyMatrix(leafShift);
bigLeaves2Geometry.faces = bigLeafFaces;
bigLeaves2Geometry.applyMatrix(leafShift);
bigLeaves3Geometry.faces = bigLeafFaces;
bigLeaves3Geometry.applyMatrix(leafShift);
