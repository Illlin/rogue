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

vec3 draw_line(in vec2 start, in vec2 end, in vec3 lightcolour) {
	vec3 runningcolour = vec3(lightcolour.xyz);
	int x1 = int(round(start.x));
	int x2 = int(round(end.x));
	int y1 = int(round(start.y));
	int y2 = int(round(end.y));

	int dx, dy, i, e;
	int incx, incy, inc1, inc2;
	int x,y;

	dx = x2-x1;
	dy = y2-y1;

	if (dx < 0) dx = -dx;
	if (dy < 0) dy = -dy;
	incx = 1;
	if (x2 < x1) incx = -1;
	incy = 1;
	if (y2 < y1) incy = -1;
	x = x1; y = y1;
	if (dx > dy) {
		runningcolour = screencol(runningcolour, vec2(x, y));
		if (runningcolour == vec3(0.,0.,0.)){
			return vec3(0.,0.,0.);
		}
		e = 2 * dy-dx;
		inc1 = 2*(dy-dx);
		inc2 = 2*dy;
		for (i=0; i<dx; i++) {
			if (e >= 0) {
				y += incy;
				e += inc1;
			}
			else
				e += inc2;
			x += incx;

			runningcolour = screencol(runningcolour, vec2(x, y));
			if (runningcolour == vec3(0.,0.,0.)){
				return vec3(0.,0.,0.);
			}
		}

	} else {
		runningcolour = screencol(runningcolour, vec2(x, y));
		if (runningcolour == vec3(0.,0.,0.)){
			return vec3(0.,0.,0.);
		}
		e = 2*dx-dy;
		inc1 = 2*(dx-dy);
		inc2 = 2*dx;
		for (i=0; i<dy; i++) {
			if (e >= 0) {
				x += incx;
				e += inc1;
			}
			else
				e += inc2;
			y += incy;
			runningcolour = screencol(runningcolour, vec2(x, y));
			if (runningcolour == vec3(0.,0.,0.)){
				return vec3(0.,0.,0.);
			}
		}
	}
	return runningcolour;
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

		//vec4(light,light,light,1.) * lightcol * texture2D(u_lightmap, v_texCoords);
		//runCast(in vec2 start, in vec2 end, in vec3 lightcolour)
		//gl_FragColor = texture2D(u_lightmap, gl_FragCoord.xy);
	}

}
