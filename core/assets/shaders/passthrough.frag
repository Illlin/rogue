#ifdef GL_ES
precision mediump float;
#endif

// varying input variables from our vertex shader
varying vec4 v_color;
varying vec2 v_texCoords;

// a special uniform for textures
uniform sampler2D u_texture;
uniform sampler2D u_lightmap;
uniform vec2 u_resolution;


void main()
{
	// set the colour for this fragment|pixel
	//gl_FragColor = v_color * texture2D(u_texture, v_texCoords);
	gl_FragColor = texture2D(u_texture, v_texCoords);


}
