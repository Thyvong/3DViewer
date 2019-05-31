export class PLight{

	constructor(){
		this.light = new THREE.PointLight( 0xFFFFFF, 1, 20, 2);
		this.geometry = new THREE.SphereGeometry( 0.05, 10, 10 );
		this.material = new THREE.MeshStandardMaterial({
        		emissive: 0x000000,
        		emissiveIntensity: 1,
        		color: 0x000000
   			});

		this.light.power = 1700;
    	this.light.castShadow = true;
    	// force shadow map to be 512*512 for performance
    	this.light.shadow.mapSize.width = 512;
    	this.light.shadow.mapSize.heigth = 512;
    	// to blur shadow line
    	this.light.shadow.radius = 1.5;
        // prevent self shadowing
        this.light.shadow.bias = 0;

    	this.light.add(new THREE.Mesh(this.geometry, this.material));
	}

	move(x,y,z){
		this.light.position.set(x,y,z);
	}

}

export class DLight{

    constructor(){
        this.light = new THREE.DirectionalLight( 0xFFFFFF, 1.0);
        this.geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
        this.material = new THREE.MeshStandardMaterial({
                emissive: 0xffffee,
                emissiveIntensity: 1,
                color: 0x000000,
                wireframe:true
            });

        this.light.power = 1700;
        this.light.castShadow = true;
        // force shadow map to be 512*512 for performance
        this.light.shadow.mapSize.width = 512;
        this.light.shadow.mapSize.heigth = 512;
        // to blur shadow line
        this.light.shadow.radius = 1.5;
        // prevent self shadowing
        this.light.shadow.bias = 0;

        this.light.add(new THREE.Mesh(this.geometry, this.material));
    }

    move(x,y,z){
        this.light.position.set(x,y,z);
    }

}