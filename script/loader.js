import * as utils from './utils.js';

class JSLoader{

	constructor(){
		this.OBJLoader = new THREE.OBJLoader();
		this.GLTFLoader = new THREE.GLTFLoader();

	}

	LoadObject(path,callback){
		var obj = null;

		var ext = utils.file_ext(utils.basename(path));
		console.log('LoadObject called with '+path);
		if(ext == 'obj'){

			console.log('object is :' + path);
			this.OBJLoader.load
			(
				path,
				callback
				
			);

		}
		if(ext == 'gltf'){
			console.log('object is :' + path);
			this.GLTFLoader.load
			(
				path,
				callback,
				undefined,
				function ( error )
				{
					console.error( error );
				}
			)
		}
		return obj;
	}


}

export default JSLoader;