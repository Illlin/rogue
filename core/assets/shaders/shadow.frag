#ifdef GL_ES
precision mediump float;
#endif

// varying input variables from our vertex shader
varying vec4 v_color;
varying vec2 v_texCoords;

// a special uniform for textures
uniform sampler2D u_texture;
uniform vec2 u_resolution;


void main()
{
	vec2 cam = u_resolution*0.5;
	vec4 lightcol = vec4(1,1,0.1,1);
	// set the colour for this fragment|pixel
	if (int(gl_FragCoord.x) > int(170*4)) {
		gl_FragColor = v_color * texture2D(u_texture, v_texCoords);
	} else {
		float light = 1./(pow(cam.x - gl_FragCoord.x,2.) + pow(cam.y - gl_FragCoord.y,2.));
		light = (1.-exp(-light*10000.));
		gl_FragColor = v_color * texture2D(u_texture, v_texCoords) * vec4(light,light,light,1.) * lightcol;
	}

}

void listPoints(in vec2 start, in vec2 end){
  float i = 0.;
  vec2 stepsize = vec2(0.,0.);
  float error;
  float errorprev;
  vec2 pos = start.xy;
  vec2 dd = vec2(0.,0.);
  vec2 d = vec2(0.,0.);

  //vec2 dif = start-end;
  //int size = abs(dif.x)+abs(dif.y);
  //vec2 points[size*2];
  //int point = 1;

  //points[0] = vec2(start.xy);

  if (d.y < 0.) {
    stepsize.y = -1.;
    d.y = -d.y;
  } else {
    stepsize.y = 1.;
  }

  if (d.x < 0.){
    stepsize.x = -1.;
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
          //points[point] = vec2(pos.y-stepsize.y,pos.x);
          //point += 1;
        } else if ((error + errorprev) > dd.x) {
          //points[point] = vec2(pos.y,pos.x-stepsize.x);
          //point += 1;
        } else {
          //points[point] = vec2(pos.y-stepsize.y,pos.x);
          //points[point+1] = vec2(pos.y,pos.x-stepsize.x);
          //point += 2;
        }
      }
      //points[point](pos.xy);
      //point += 1;
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
          //points[point] = vec2(pos.y,pos.x-stepsize.x);
          //point += 1;
        } else if ((error + errorprev) > dd.y) {
          //points[point] = vec2(pos.y-stepsize.y, pos.x);
          //point += 1;
        } else {
          //points[point] = vec2(pos.y,pos.x-stepsize.x);
          //points[point+1] = vec2(pos.y-stepsize.y, pos.x);
          //point += 2;
        }
      }
      //points[point] = vec2(pos.xy);
      //point += 1;
      errorprev = error;
    }
  }
  //return points;
}
