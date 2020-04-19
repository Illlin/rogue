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

vec3 screencol(in vec3 current, in vec2 pixpos){
	vec4 pixcol = texture2D(u_lightmap, pixpos);//pixpos - gl_FragCoord.xy);
	//return (current)*pixcol.y; //* (pixcol.xyz * (pixcol.w)));
	//return pixcol.yyy;
	if (pixcol.x < 0.15){
		return vec3(0.,0.,0.);
	} else {
		return current * vec3(0.99,0.99,0.99);
	}
}

double myabs(double x) {
	if (x < 0) return -x;
	else return x;
}

vec3 draw_line(in vec2 start, in vec2 end, in vec3 lightcolour) {
	double x1 = round(start.x);
	double x2 = round(end.x);
	double y1 = round(start.y);
	double y2 = round(end.x);
	
	double dx = x2 - x1;
	double dy = y2 - y1;
	double xinc, yinc;
	
	double x = x1, y = y1;
	
	int steps;
	
	if (myabs(dx) > myabs(dy)) {
		steps = int(round(myabs(dx)));
	} else {
		steps = int(round(myabs(dy)));
	}
	
	xinc = dx / double(steps);
	yinc = dy / double(steps);
	
	for (int v = 0; v < steps; v++) {
		x += xinc;
		y += yinc;
		if (texture(u_lightmap, vec2(x, y)).x < 0.15) {
			return vec3(0.,0.,1.);

		}
	}
	
	return vec3(1.,1.,0.);
}

vec4 getlight(in vec2 lightpos, in vec2 endpos, in vec4 lightcol){
	 vec3 full = draw_line(lightpos, endpos, vec3(lightcol.xyz));
	 //full.x = (1.-exp(-full.x*lightcol.w));
	 return vec4(full.xyz, 1.);
}

void main()
{
	vec2 cam = u_resolution*0.5;

	vec4 light1col = vec4(1.,1.,1.,1);
	vec2 light1pos = u_resolution*0.5;

	// set the colour for this fragment|pixel
	if (int(gl_FragCoord.x) > int(170*4)) {
		gl_FragColor = v_color * texture2D(u_texture, v_texCoords);
	} else {

		//float light = 1./(pow(cam.x - gl_FragCoord.x,2.) + pow(cam.y - gl_FragCoord.y,2.));
		//light = (1.-exp(-light*100000.));
		//gl_FragColor = v_color * texture2D(u_texture, v_texCoords) * getlight(light1pos, gl_FragCoord.xy, light1col);

		gl_FragColor = getlight(light1pos, gl_FragCoord.xy, light1col);
		//gl_FragColor = vec4(0.,0.,0.,1.);

		//vec4(light,light,light,1.) * lightcol * texture2D(u_lightmap, v_texCoords);
		//runCast(in vec2 start, in vec2 end, in vec3 lightcolour)
		//gl_FragColor = texture2D(u_lightmap, gl_FragCoord.xy);
	}

}
