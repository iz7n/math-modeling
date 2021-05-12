precision highp float;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

varying vec2 _position;

uniform float seconds;

float norm(float n, float from, float to)
{
  return (to - from) * n + from;
}

float lerp(float amt, float from, float to)
{
  return from + (to - from) * amt;
}

float map(float n, float fromMin, float fromMax, float toMin, float toMax)
{
  return lerp(norm(n, fromMin, fromMax), toMin, toMax);
}

vec3 hsv2rgb(vec3 c)
{
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
  float offset = 0.;
  float x = _position.x + seconds / 4.;
  if (_position.y < sin(x)) offset = 2.;

  float noiseVal = noise(vec3(_position / 3., seconds / 20. + offset));
  float hue = map(noiseVal, 0., 1., .77, .93);
  float brightness = map(noiseVal, 0., 1., .7, 1.);

  vec3 col = hsv2rgb(vec3(hue, 1., brightness));
  gl_FragColor = vec4(col, 1.);
}