import "../js/three.js";
import "../js/OrbitControls.js" ;
import "../js/OBJLoader.js";
import "../js/GLTFLoader.js";
import * as utils from './utils.js';
import * as Machin from './resource.js';
import * as Light from './light.js';
import FPSRate from "./fps_rate.js";
import JSLoader from './loader.js';
import * as Shaders from './shaders.js';


/*
Mission list :

- Light control hud = ok
	needs ambient light = done
- Browse file to load = DnD
	bug incorrect path
- Custom shaders
	combined shader ?
- Switch shaders with hud
- Format objets et skybox = whut ?
- draggable object

*/


// FPS Manager
// function is declared inside brackets and executed in one syntax
FPSRate();

// ------------ SCENE
// ------------------

const sceneviewer = new Machin.SceneViewer();

const ambientlight = new THREE.AmbientLight( 0x707070, 0.1);
sceneviewer.add(ambientlight);
const plight = new Light.PLight();
// light geometry shape is included in the light method
sceneviewer.add(plight.light);
const plight_helper = new THREE.PointLightHelper(plight.light,0.2);
sceneviewer.add(plight_helper);
plight.light.intensity = 2;


const dlight = new Light.DLight();
// light geometry shape is included in the light method
sceneviewer.add(dlight.light);
sceneviewer.add(dlight.light.target);
const dlight_helper = new THREE.DirectionalLightHelper(dlight.light);
sceneviewer.add(dlight_helper);

dlight.light.intensity = 0.4;
dlight.move(0,3,0);
dlight.light.target.position.set(0,0,0);

const decor = Machin.SkyBox(40,40,40);
sceneviewer.add(decor);

const plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(10,10),
		new THREE.MeshPhongMaterial(
		{
     		side: THREE.DoubleSide,
    	})
	);
plane.receiveShadow = true;

sceneviewer.add(plane);
plane.rotation.x = Math.PI * -.5;


// ------------ GUI
// ------------------


class ColorGUIHelper {

	constructor(object, prop) {
		this.object = object;
	  	this.prop = prop;
	}

	get value() {
	  	return `#${this.object[this.prop].getHexString()}`;
	}

	set value(hexString) {
	 	this.object[this.prop].set(hexString);
	}
}

const gui = new dat.GUI();
const lightfolder = gui.addFolder('Lights');

function makeALightGUI(gui, onChangeFn) {
    const folder = gui.addFolder('ALight');

	gui.addColor(new ColorGUIHelper(ambientlight, 'color'), 'value').name('color') ;
	gui.add(ambientlight, 'intensity', 0, 2, 0.01);
    folder.open();
}

function makePLightGUI(gui, vector3, onChangeFn) {
    const folder = gui.addFolder('PLight');

	gui.addColor(new ColorGUIHelper(plight.light, 'color'), 'value').name('color') ;
	gui.add(plight.light, 'intensity', 0, 2, 0.01);
	gui.add(plight.light, 'distance', 0, 40).onChange(onChangeFn);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
}

function makeDLightGUI(gui, posvec,targetvec, onChangeFn) {
    const folder = gui.addFolder('DLight');
    const pos = folder.addFolder('Pos');
    const target = folder.addFolder('Target');

	gui.addColor(new ColorGUIHelper(dlight.light, 'color'), 'value').name('color') ;
	gui.add(dlight.light, 'intensity', 0, 2, 0.01);
    pos.add(posvec, 'x', -10, 10).onChange(onChangeFn);
    pos.add(posvec, 'y', 0, 10).onChange(onChangeFn);
    pos.add(posvec, 'z', -10, 10).onChange(onChangeFn);

    target.add(targetvec, 'x', -10, 10).onChange(onChangeFn);
    target.add(targetvec, 'y', 0, 10).onChange(onChangeFn);
    target.add(targetvec, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
}

makePLightGUI(
	lightfolder,
	plight.light.position,
	function(){
		plight_helper.update();
	}
);
makeDLightGUI(
	lightfolder,
	dlight.light.position,dlight.light.target.position,
	function(){
		dlight_helper.update();
	}
);
makeALightGUI(
	lightfolder,
	function(){
		dlight_helper.update();
	}
);


// ------------ PROPS
// ------------------

const cube = Machin.Cube();
sceneviewer.add( cube );
cube.position.x = 2;
cube.position.y = 1;
sceneviewer.camera.position.z = 5;
//cube.receiveShadow = true;
cube.castShadow = true;

const cube2 = Machin.Cube2();
sceneviewer.add( cube2 );
cube2.position.x = -2;
cube2.position.y = 0.5;
//cube2.receiveShadow = true;
cube2.castShadow = true;

const load = new JSLoader();


// ------------ Shaded object
// ------------------

var shader = Shaders.Shaders['Play2'];
var unif = THREE.UniformsUtils.clone( shader.uniforms );
var vs = shader.vertexShader;
var fs = shader.fragmentShader;
var shadedmat = new THREE.ShaderMaterial( { uniforms: unif, vertexShader: vs, fragmentShader: fs } );
shadedmat.uniforms[ "uDirLightPos" ].value = dlight.light.position;
shadedmat.uniforms[ "uDirLightColor" ].value = dlight.light.color;
shadedmat.uniforms[ "uAmbientLightColor" ].value = ambientlight.color;

var sphere = new THREE.Mesh( new THREE.SphereGeometry( 1, 20, 20 ), shadedmat );
sceneviewer.add( sphere );
sphere.material.needUpdate =true;
sphere.position.z = -2;
sphere.position.y = 1;
//cube2.receiveShadow = true;
sphere.castShadow = true;

var gltfObject = null;
load.LoadObject('model/boombox/BoomBoxWithAxes.gltf', function(machin)
	{
		gltfObject=machin.scene.children[0];
		gltfObject.position.y=0.5;
		gltfObject.scale.x = 50;
		gltfObject.scale.y = 50;
		gltfObject.scale.z = 50;
		gltfObject.material = shadedmat;
		gltfObject.material.needUpdate = true;
		sceneviewer.add(gltfObject);
	}
);



// function
const update = function(){
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;


	const time = Date.now() * 0.0005;
	plight.move( Math.sin(time * 0.7) * 2, 1, Math.cos(time * 0.5) * 2);

	 
};


const GameLoop = function(){

	requestAnimationFrame(GameLoop);
	update();
	sceneviewer.render();

};
GameLoop();