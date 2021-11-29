import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'

let scene;
let camera;
let renderer;
let controls;
let raycaster;
let ultimoPixel;
let pixel1=null;
let pixel2=null;

const mouse = new THREE.Vector3();

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
    renderer.name="setup";
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    light.name="setup";
    scene.add( light );

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 120;
    camera.name="setup";

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = true;
    controls.autoRotate = false;

    raycaster = new THREE.Raycaster()
}

function animate() {
    controls.update();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

function desenharPlanoRosa(x,y, pos){
    const geometry = new THREE.PlaneGeometry(5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0xED77C4, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.x=x;
    plane.position.y=y;
    plane.position.z=0;
    plane.name= pos;
    scene.add( plane );
}
function desenharPlanoAzul(x,y, pos){
    const geometry = new THREE.PlaneGeometry( 5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0x5EB1BC, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.x=x;
    plane.position.y=y;
    plane.position.z=0;
    plane.name= pos;
    scene.add( plane );
}

function planos (){
    for(let y=-105, a=0, py=-21;a < 43;a++, y= y+5, py++){
        for (let i=-105,e=0, px=-21; e < 43; e++, i=i+5, px++){
            let pos = "["+px + "," + py+"]"
            if ((a % 2 == 0 && e % 2 ==0)|| (a % 2 != 0) && (e % 2 != 0)){
                desenharPlanoRosa(i,y, pos);
            }else
                desenharPlanoAzul(i,y, pos);
            }
     }
}

function eixoPositivoX( ){
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial( { color: 0x242291 } );
    const points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 107, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    line.name= "eixoX"
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
    line.name="eixoY";
    scene.add( line );
    renderer.render( scene, camera );
}

function detectarObjeto() {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
    let objeto;
    for ( let i = 0; i < intersects.length; i ++ ) {
        objeto = intersects[i].object;
        //if(objeto.name != ultimoPixel) {
            if (objeto.name != "setup" && objeto.name != "eixoX" && objeto.name != "eixoY") {
                return objeto;
            }
        //}
    }
    //renderer.render( scene, camera );
    return null;
}
function selecionarPixel(objeto){
    objeto.material.color.set( 0xff0000 );
    let coord = objeto.name.split(",");
    let x = coord[0].substring(1);
    let y = coord[1].substring(0,coord[1].length);
    let ponto = {x:x, y:y}
    if (pixel1 == null){
        pixel1= ponto;
    }
    else {
        pixel2 = ponto;
        cubosAmarelos(0,0,0)
    }
}
function desenharLinha(){

}

function imprimirNome(objeto) {
    if(objeto.name != ultimoPixel) {
        console.log(objeto.name)
        ultimoPixel = objeto.name;
    }
}
window.addEventListener( 'mousemove', onMouseMove, false );
function onMouseMove( event ) {
    let objeto = detectarObjeto();
    if (objeto) {
        imprimirNome(objeto);
    }
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener( 'click', onMouseDown, false );
function onMouseDown( event ) {
    let objeto = detectarObjeto()
    if(objeto){
        selecionarPixel(objeto);
    }
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function cubosAmarelos (x,y,z){
    const geometry = new THREE.BoxGeometry( 5, 5, 5/4 );
    const material = new THREE.MeshBasicMaterial( {
        color: 0xE9E207,
        opacity: 0.5
    } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.x=x;
    cube.position.y=y;
    cube.position.z=z;
    cube.name = "PixelAmarelo";
}
