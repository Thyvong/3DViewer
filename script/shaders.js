﻿
export const Shaders = {

	'Play1' : {

		uniforms: {

			"uDirLightPos": { value: new THREE.Vector3() },
			"uDirLightColor": { value: new THREE.Color( 0xeeeeee ) },

			"uAmbientLightColor": { value: new THREE.Color( 0x050505 ) },

			"uBaseColor": { value: new THREE.Color( 0xffffff ) }

		},

		vertexShader: [

			"varying vec3 vNormal;",
			"varying vec3 vRefract;",

			"void main() {",

				"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"vec3 worldNormal = normalize ( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

				"vNormal = normalize( normalMatrix * normal );",

				"vec3 I = worldPosition.xyz - cameraPosition;",
				"vRefract = refract( normalize( I ), worldNormal, 1.02 );",

				"gl_Position = projectionMatrix * mvPosition;",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 uBaseColor;",

			"uniform vec3 uDirLightPos;",
			"uniform vec3 uDirLightColor;",

			"uniform vec3 uAmbientLightColor;",

			"varying vec3 vNormal;",

			"varying vec3 vRefract;",

			"void main() {",

				"float directionalLightWeighting = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);",
				"vec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;",

				"float intensity = smoothstep( - 0.5, 1.0, pow( length(lightWeighting), 20.0 ) );",
				"intensity += length(lightWeighting) * 0.2;",

				"float cameraWeighting = dot( normalize( vNormal ), vRefract );",
				"intensity += pow( 1.0 - length( cameraWeighting ), 6.0 );",
				"intensity = intensity * 0.2 + 0.3;",

				"if ( intensity < 0.50 ) {",

					"gl_FragColor = vec4( 2.0 * intensity * uBaseColor, 1.0 );",

				"} else {",

					"gl_FragColor = vec4( 1.0 - 2.0 * ( 1.0 - intensity ) * ( 1.0 - uBaseColor ), 1.0 );",

				"}",

			"}"

		].join( "\n" )

	},

	'Play2' : {

		uniforms: {

			"uDirLightPos": { value: new THREE.Vector3() },
			"uDirLightColor": { value: new THREE.Color( 0xeeeeee ) },

			"uAmbientLightColor": { value: new THREE.Color( 0x050505 ) },

			"uBaseColor": { value: new THREE.Color( 0xeeeeee ) },
			"uLineColor1": { value: new THREE.Color( 0x808080 ) },
			"uLineColor2": { value: new THREE.Color( 0x505050 ) },
			"uLineColor3": { value: new THREE.Color( 0x404040 ) },
			"uLineColor4": { value: new THREE.Color( 0x202020 ) }

		},

		vertexShader: [

			"varying vec3 vNormal;",

			"void main() {",

				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"vNormal = normalize( normalMatrix * normal );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 uBaseColor;",
			"uniform vec3 uLineColor1;",
			"uniform vec3 uLineColor2;",
			"uniform vec3 uLineColor3;",
			"uniform vec3 uLineColor4;",

			"uniform vec3 uDirLightPos;",
			"uniform vec3 uDirLightColor;",

			"uniform vec3 uAmbientLightColor;",

			"varying vec3 vNormal;",

			"void main() {",

				"float camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);",
				"float light = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);",

				"gl_FragColor = vec4( uBaseColor, 1.0 );",

				"if ( length(uAmbientLightColor + uDirLightColor * light) < 1.00 ) {",

					"gl_FragColor *= vec4( uLineColor1, 1.0 );",

				"}",

				"if ( length(uAmbientLightColor + uDirLightColor * camera) < 0.50 ) {",

					"gl_FragColor *= vec4( uLineColor2, 1.0 );",

				"}",

			"}"

		].join( "\n" )

	}

	

};