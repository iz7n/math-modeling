precision highp float;

attribute vec2 position;

varying vec2 _position;

void main()
{
  gl_Position = vec4(position, 0.0, 1.0);
  _position = position;
}