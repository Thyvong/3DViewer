export function Cube(){

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
	return new THREE.Mesh( geometry, material );
}

export function Sphere(){

	var geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
	var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
	return new THREE.Mesh( geometry, material );
}

export function SkyBox(x,y,z){
	var geometry = new THREE.BoxGeometry( x, y, z );
	var material = new THREE.MeshBasicMaterial( { color: 0x8c8c8c, side: THREE.DoubleSide } );
	return new THREE.Mesh( geometry, material );
}

export function Cube2(){
	var cubeMaterials =
	[ 
		new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("img/1.png"), side: THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("img/1.png"), side: THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("img/1.png"), side: THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("img/1.png"), side: THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("img/1.png"), side: THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("img/1.png"), side: THREE.DoubleSide})
	];
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshFaceMaterial( cubeMaterials );
	return new THREE.Mesh( geometry, material );
};



export class SceneViewer{
	constructor(){
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();

		// for scale resize
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.physicallyCorrectLights = true;
    	this.renderer.gammaInput = true;
    	this.renderer.gammaOutput = true;
    	this.renderer.shadowMap.enabled = true;
    	this.renderer.shadowMap.bias = 0.0001;
    	this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		document.body.appendChild( this.renderer.domElement );
		
		window.addEventListener('resize', function()
			{
				var width = window.innerWidth;
				var height = window.innerHeight;
				this.renderer.setSize( width, height);
				this.camera.aspect = width/height;
				this.camera.updateProjectionMatrix();
			
			}
		);

		this.controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
		this.sceneObjects = [];
	}

	add(item){
		this.scene.add( item );
		this.sceneObjects.push(item);
	}
	render(){
		this.renderer.render(this.scene, this.camera);
	}
}
