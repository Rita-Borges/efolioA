import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'

let scene;
let camera;
let renderer;
let controls

export function Inicio (){
    setup();
    planos();
    animate();
    eixoPositivoX();
    eixoPositivoY();

}

function setup (){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1,2000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 120;

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = true;
    controls.autoRotate = false;
}

function animate() {
    controls.update();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
function desenharPlanoRosa(x,y){
    const geometry = new THREE.PlaneGeometry(5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0xED77C4, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.x=x;
    plane.position.y=y;
    plane.position.z=0;
    scene.add( plane );
}
function desenharPlanoAzul(x,y){
    const geometry = new THREE.PlaneGeometry( 5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0x5EB1BC, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.x=x;
    plane.position.y=y;
    plane.position.z=0;
    scene.add( plane );
}

function desenharPlano(x,y){
    const geometry = new THREE.PlaneGeometry( 5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.x=x;
    plane.position.y=y;
    plane.position.z=0;
    scene.add( plane );
}

function planos (){
    for(let y=-105, a=0;a < 43;a++, y= y+5){
        for (let i=-105,e=0; e < 43; e++, i=i+5){
            if ((a % 2 == 0 && e % 2 ==0)|| (a % 2 != 0) && (e % 2 != 0)){
                desenharPlanoRosa(i,y);
            }else
                desenharPlanoAzul(i,y);
            }
     }
    desenharPlano(0,0)
}

function eixoPositivoX( ){
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial( { color: 0x242291 } );
    const points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 107, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );
    renderer.render( scene, camera );

}

function eixoPositivoY( ){
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial( { color: 0XC70845} );
    const points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 107, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );
    renderer.render( scene, camera );
}