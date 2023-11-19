import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import {lineMP} from "../lineMP.mjs";


let scene = new THREE.Scene();
let camera;
let renderer;
let controls;
let raycaster;
let ultimoPixel;
let linhaExata;
let pixel1 = null;
let pixel2 = null;
let objPixel1 = null;
let objPixel2 = null;
let obj1Cor = null;
let obj2Cor = null;

let cameraStartPosition = new THREE.Vector3(0, 0, 120);
let cameraTopViewPosition = new THREE.Vector3(0, 0, 300);
let cameraAnimationDuration = 1000;  // Duração da animação em milissegundos
let cameraAnimationStartTime = null;


const mouse = new THREE.Vector3();


export function iniciarInterface() {
    setup();
    planos();
    animate();
    eixoPositivoX();
    eixoPositivoY();

}

function setup() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 2000);
    renderer = new THREE.WebGLRenderer();
    renderer.name = "setup";
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040); // soft white light
    light.name = "setup";
    scene.add(light);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 120;
    camera.name = "setup";

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = false;

    raycaster = new THREE.Raycaster()
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function desenharPlanoRosaEscuro(x, y, pos) {
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshBasicMaterial({color: 0xDDA0DD, side: THREE.DoubleSide});
    let plane = new THREE.Mesh(geometry, material);
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = 0;
    plane.name = pos;
    scene.add(plane);
}

function desenharPlanoRosaClaro(x, y, pos) {
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshBasicMaterial({color: 0xFF69B4, side: THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = 0;
    plane.name = pos;
    scene.add(plane);
}

function planos() {
    for (let y = -105, a = 0, py = -21; a < 43; a++, y = y + 5, py++) {
        for (let i = -105, e = 0, px = -21; e < 43; e++, i = i + 5, px++) {
            let pos = "[" + px + "," + py + "]"
            if ((a % 2 === 0 && e % 2 === 0) || (a % 2 !== 0) && (e % 2 !== 0)) {
                desenharPlanoRosaEscuro(i, y, pos);
            } else
                desenharPlanoRosaClaro(i, y, pos);
        }
    }
}

function eixoPositivoX() {
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({color: 0x242291});
    const points = [];
    points.push(new THREE.Vector3(0, 0, 1));
    points.push(new THREE.Vector3(107, 0, 1));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.name = "eixoX"
    scene.add(line);
    renderer.render(scene, camera);

}

function eixoPositivoY() {
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({color: 0XC70845});
    const points = [];
    points.push(new THREE.Vector3(0, 0, 1));
    points.push(new THREE.Vector3(0, 107, 1));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.name = "eixoY";
    scene.add(line);
    renderer.render(scene, camera);
}

function detectarObjeto() {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);
    let objeto;
    for (let i = 0; i < intersects.length; i++) {
        objeto = intersects[i].object;
        if (objeto.name !== "setup" && objeto.name !== "eixoX" && objeto.name !== "eixoY" && objeto.name !== "PixelAmarelo") {
            return objeto;
        }
    }
    //renderer.render( scene, camera );
    return null;
}

function selecionarPixel(objeto) {

    let coord = objeto.name.split(",");
    coord = coord.map(coordenada => coordenada.replaceAll('[', '').replaceAll(']', ''))
    let x = parseInt(coord[0])//.substring(1));
    let y = parseInt(coord[1])//.substring(0,coord[1].length));
    let ponto = {x: x, y: y}
    if (pixel1 == null) {
        pixel1 = ponto;
        objPixel1 = objeto;
        obj1Cor = objeto.material.color.getHex();
        objeto.material.color.set(0xff0000);
    } else {
        pixel2 = ponto;
        objPixel2 = objeto;
        obj2Cor = objeto.material.color.getHex();
        objeto.material.color.set(0xff0000);
        desenharLinha();
        objPixel1.material.color.setHex(obj1Cor)
        objPixel2.material.color.setHex(obj2Cor)
        pixel1 = null;
        pixel2 = null;
        objPixel1 = null;
        objPixel2 = null;
        obj1Cor = null;
        obj2Cor = null;
    }
}

function desenharLinha() {
    let pontosp = lineMP(pixel1, pixel2);
    // Criar a linha exata preta
    const materialLinha = new THREE.LineBasicMaterial({color: 0x000000});
    const pointsLinha = [];
    for (let i = 0; i < pontosp.length; i++) {
        pointsLinha.push(new THREE.Vector3(pontosp[i].x * 5, pontosp[i].y * 5, 1));
    }
    const geometryLinha = new THREE.BufferGeometry().setFromPoints(pointsLinha);
    linhaExata = new THREE.Line(geometryLinha, materialLinha);
    linhaExata.name = 'linha';
    scene.add(linhaExata);

    // Criar os ladrilhos amarelos semi-transparentes
    for (let i = 0; i < pontosp.length; i++) {
        let amarelo = pontosp[i];
        gerarCubosAmarelos(amarelo.x * 5, amarelo.y * 5, 1);
    }
}

function imprimirNome(objeto) {
    if (objeto.name !== ultimoPixel) {
        console.log(objeto.name)
        ultimoPixel = objeto.name;
    }
}

window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    let objeto = detectarObjeto();
    if (objeto) {
        imprimirNome(objeto);
    }
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('click', onMouseDown, false);

function onMouseDown(event) {
    let objeto = detectarObjeto()
    if (objeto) {
        selecionarPixel(objeto);
    }
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function gerarCubosAmarelos(x, y, z) {
    const geometry = new THREE.BoxGeometry(5, 5, 5 / 4);
    const material = new THREE.MeshBasicMaterial({
        color: 0xE9E207,
        opacity: 0.5,
        transparent: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.name = "PixelAmarelo";
}

document.addEventListener('keydown', onkeypress, false);

function onkeypress(event) {
    //Função para aceitar os eventos da tecla para mudar a vista

    let key = event.which;
    switch (key) {
        case 8:                                                                                    //Verifica Tecla "backspace"
            limparV();                                                                                 //Altera para a vista alternativa
            break;

        case 88:                                                                                    //Verifica Tecla "x"
            selecionarPixel(detectarObjeto())//Lê caixa de texto e desenha pontos
            break;
        case 67:  // Tecla "C"
            moverCameraTopView();
            break;

    }
}

function moverCameraTopView() {
    controls.enabled = false;  // Desabilitar o controle durante a animação

    cameraAnimationStartTime = performance.now();

    function animateCamera() {
        const currentTime = performance.now();
        const elapsed = currentTime - cameraAnimationStartTime;

        if (elapsed < cameraAnimationDuration) {
            const t = elapsed / cameraAnimationDuration;
            camera.position.lerpVectors(cameraStartPosition, cameraTopViewPosition, t);
            requestAnimationFrame(animateCamera);
        } else {
            camera.position.copy(cameraTopViewPosition);
            controls.enabled = true;  // Animacao concluída, permitir controle novamente
        }

        renderer.render(scene, camera);
    }

    animateCamera();
}

function limparV() {
    let obj;
    do {
        obj = scene.getObjectByName("PixelAmarelo");
        if (obj) {
            scene.remove(obj);
            obj.material.dispose();
        }
    } while (obj);
    // Remover a linha preta
    scene.remove(linhaExata);
    do {
        obj = scene.getObjectByName("linha");
        if (obj) {
            scene.remove(obj);
            obj.material.dispose();
        }
    } while (obj);
    renderer.render(scene, camera);


}
