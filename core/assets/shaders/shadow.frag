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
	vec4 pixcol = texture2D(u_lightmap, pixpos);
	//return (current)*pixcol.y; //* (pixcol.xyz * (pixcol.w)));
	//return pixcol.yyy;
	if (pixcol.x < 0.15){
		return vec3(0.,0.,0.);
	} else {
		return current;
	}
}
/*
vec3 draw_line(in vec2 start, in vec2 end, in vec3 lightcolour){
	vec3 runcol = vec3(lightcolour.xyz);
  float i = 0.;
  vec2 stepsize = vec2(0.,0.);
  float error;
  float errorprev;
  vec2 pos = start;
  vec2 dd = vec2(0.,0.);
  vec2 d = end-start;

  //vec2 dif = start-end;
  //int size = abs(dif.x)+abs(dif.y);
  //vec2 points[size*2];
  float point = 1.;

	runcol = screencol(runcol, vec2(start.xy));
  //points[0] = vec2(start.xy);

  if (d.y < 0.) {
    stepsize.y = -1.;
    d.y = -d.y;
  } else {
    stepsize.y = 1.;
  }

  if (d.x < 0.){
    stepsize.x = -1.;
		d.x = -d.x;
  } else {
    stepsize.x = 1.;
  }

  dd = 2.*d;
  if (dd.x > dd.y) {
    errorprev = error = d.x;
    for (i = 0.; i < d.x ; i++) {
      pos.x += stepsize.x;
      error += dd.y;
      if (error > dd.x) {
        pos.y += stepsize.y;
        error -= stepsize.y;
        if ((error + errorprev) < dd.x) {
					runcol = screencol(runcol, vec2(pos.y-stepsize.y,pos.x));
          //points[point] = vec2(pos.y-stepsize.y,pos.x);
          point += 1.;
        } else if ((error + errorprev) > dd.x) {
					runcol = screencol(runcol, vec2(pos.y,pos.x-stepsize.x));
          //points[point] = vec2(pos.y,pos.x-stepsize.x);
          point += 1.;
        } else {
					runcol = screencol(runcol, vec2(pos.y-stepsize.y,pos.x));
					runcol = screencol(runcol, vec2(pos.y,pos.x-stepsize.x));
          //points[point] = vec2(pos.y-stepsize.y,pos.x);
          //points[point+1] = vec2(pos.y,pos.x-stepsize.x);
          point += 2.;
        }
      }
			runcol = screencol(runcol, vec2(pos.xy));
      //points[point](pos.xy);
      point += 1.;
      errorprev = error;
    }
  } else{
    error = d.y;
		errorprev = error;
    for (i = 0.; i < d.y; i++) {
      pos.y += stepsize.y;
      error += dd.x;
      if (error > dd.y) {
        pos.x += stepsize.x;
        error -= dd.y;
        if ((error + errorprev) < dd.y) {
					runcol = screencol(runcol, vec2(pos.y,pos.x-stepsize.x));
          //points[point] = vec2(pos.y,pos.x-stepsize.x);
          point += 1.;
        } else if ((error + errorprev) > dd.y) {
					runcol = screencol(runcol, vec2(pos.y-stepsize.y, pos.x));
          //points[point] = vec2(pos.y-stepsize.y, pos.x);
          point += 1.;
        } else {
					runcol = screencol(runcol, vec2(pos.y,pos.x-stepsize.x));
					runcol = screencol(runcol, vec2(pos.y-stepsize.y, pos.x));
          //points[point] = vec2(pos.y,pos.x-stepsize.x);
          //points[point+1] = vec2(pos.y-stepsize.y, pos.x);
          point += 2.;
        }
      }
			runcol = screencol(runcol, vec2(pos.xy));
      //points[point] = vec2(pos.xy);
      point += 1.;
      errorprev = error;
    }
  }
	return runcol;
  //return vec3(int(point)/300,int(point)/300,int(point)/300);
}*/


vec3 draw_line(in vec2 start, in vec2 end, in vec3 lightcolour) {
	vec3 runningcolour = vec3(lightcolour.xyz);
	int x1 = 1;//int(round(start.x));
	int x2 = 1;//int(round(end.x));
	int y1 = 1;//int(round(start.y));
	int y2 = 1;//int(round(end.x));

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
			return vec3(1.,0.,0.);
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
				return vec3(1.,0.,0.);
			}
		}

	} else {
		runningcolour = screencol(runningcolour, vec2(x, y));
		if (runningcolour == vec3(0.,0.,0.)){
			return vec3(1.,0.,0.);
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
				return vec3(1.,0.,0.);
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

	vec4 light1col = vec4(1.,0.,1.,1);
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
