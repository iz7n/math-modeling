interface GLShader {
  shader: WebGLShader;
  source: string;
}

interface GLBuffer {
  buffer: WebGLBuffer;
  data: number[][][];
  flatData: number[];
}

export default class GL {
  gl: WebGLRenderingContext;

  program!: WebGLProgram;

  vertexShader!: GLShader;
  fragmentShader!: GLShader;

  vertexBuffer!: GLBuffer;
  indexBuffer!: GLBuffer;

  attributeLocations: Map<string, GLint> = new Map();
  uniformLocations: Map<string, WebGLUniformLocation> = new Map();
  textures: WebGLTexture[] = [];

  time = 0;
  animateFn?: (time: number) => void;

  constructor(public canvas: HTMLCanvasElement) {
    // Set up the WebGL rendering context
    const gl = canvas.getContext('webgl');

    if (!gl) throw new Error('WebGL not supported');

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    this.canvas = canvas;
    this.gl = gl;
    this.setSize().background(0, 0, 0);
  }

  /**
   * Resizes the WebGL context to the width and height of the canvas
   */
  setSize(): this {
    const { canvas, gl } = this;

    const width = canvas.clientWidth * window.devicePixelRatio;
    const height = canvas.clientHeight * window.devicePixelRatio;

    canvas.width = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);

    return this;
  }

  /**
   * Gets the text of a file
   * @param path path to the file
   */
  static async loadFile(path: string): Promise<string> {
    const response = await fetch(path);
    const text = await response.text();
    return text;
  }

  /**
   * Creates a vertex shader from its source code
   * @param source the source of the vertex shader
   */
  createVertexShader(source: string): WebGLShader {
    const { gl } = this;
    // Create the vertex shader and bind the source
    const shader = gl.createShader(gl.VERTEX_SHADER);
    if (!shader) throw new Error('Error creating vertex shader');
    this.vertexShader = { shader, source };

    this.setShaderSource('vertex', source);

    // Check for shader errors
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(
        `Error compiling vertex shader: ${gl.getShaderInfoLog(shader)}`
      );

    return shader;
  }

  /**
   * Creates a fragment shader from its source code
   * @param source the source of the fragment shader
   */
  createFragmentShader(source: string): WebGLShader {
    const { gl } = this;
    // Create the fragment shader and bind the source
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!shader) throw new Error('Error creating fragment shader');
    this.fragmentShader = { shader, source };

    this.setShaderSource('fragment', source);

    // Check for shader errors
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(
        `Error compiling fragment shader: ${gl.getShaderInfoLog(shader)}`
      );

    return shader;
  }

  /**
   * Sets the source code of a shader
   * @param type vertex or fragment
   * @param source the shader source
   */
  setShaderSource(type: 'vertex' | 'fragment', source: string): this {
    const { gl } = this;
    // Bind the source
    gl.shaderSource(
      (type === 'vertex' ? this.vertexShader : this.fragmentShader).shader,
      source
    );

    return this;
  }

  /**
   * Creates a program to run in WebGL
   * @param vertexShader
   * @param fragmentShader
   */
  createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram {
    const { gl } = this;
    // Create the program and bind the vertex and fragment shaders
    const program = gl.createProgram();
    if (!program) throw new Error('Error creating program');

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Check for program errors
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(
        `Error linking program: ${gl.getProgramInfoLog(program)}`
      );

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
      throw new Error(
        `Error validating program: ${gl.getProgramInfoLog(program)}`
      );

    gl.useProgram(program);
    this.program = program;
    return program;
  }

  createProgramFromSources(
    vertexSource: string,
    fragmentSource: string
  ): WebGLProgram {
    return this.createProgram(
      this.createVertexShader(vertexSource),
      this.createFragmentShader(fragmentSource)
    );
  }

  /**
   * Creates a vertex buffer
   * @param data the data for the buffer
   */
  createVertexBuffer(data: number[][][]): WebGLBuffer {
    const { gl } = this;
    // Create the vertex buffer
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error('Error creating vertex buffer');

    // Bind the data to the buffer
    const flatData = data.flat(2);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flatData), gl.STATIC_DRAW);

    this.vertexBuffer = { buffer, data, flatData };
    return buffer;
  }

  /**
   * Creates an index buffer
   * @param data the data for the buffer
   */
  createIndexBuffer(data: number[][][]): WebGLBuffer {
    const { gl } = this;
    // Create the index buffer
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error('Error creating index buffer');

    // Bind the data to the buffer
    const flatData = data.flat(2);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(flatData),
      gl.STATIC_DRAW
    );

    this.indexBuffer = { buffer, data, flatData };
    return buffer;
  }

  /**
   * Gets the location of a attribute
   * @param name the name of the attribute
   */
  getAttributeLocation(name: string): GLint {
    // Attribute location is already cached
    let attributeLocation = this.attributeLocations.get(name);
    if (attributeLocation) return attributeLocation;

    // Need to find the attribute location
    attributeLocation = this.gl.getAttribLocation(this.program, name);
    if (attributeLocation !== -1)
      this.attributeLocations.set(name, attributeLocation);
    return attributeLocation;
  }

  /**
   * Gets the location of a uniform
   * @param name the name of the uniform
   */
  getUniformLocation(name: string): WebGLUniformLocation | null {
    // Uniform location is already cached
    const cachedUniformLocation = this.uniformLocations.get(name);
    if (cachedUniformLocation) return cachedUniformLocation;

    // Need to find the uniform location
    const uniformLocation = this.gl.getUniformLocation(this.program, name);
    if (uniformLocation) this.uniformLocations.set(name, uniformLocation);
    return uniformLocation;
  }

  /**
   *
   * @param name the name of the attribute
   * @param config
   * Number of elements per attribute,
   * Type of elements,
   * Is it normalized?,
   * Size of an individual vertex,
   * Offset from the beginning of a single vertex to this attribute
   * @returns the attribute location
   */
  createAttribute(
    name: string,
    config: [GLint, GLenum, GLboolean, GLsizei, GLintptr]
  ): GLint {
    const { gl } = this;
    // Find the attribute location
    const attributeLocation = this.getAttributeLocation(name);
    // Config and enable the attribute
    gl.vertexAttribPointer(
      attributeLocation, // Attribute location
      ...config
      // Number of elements per attribute
      // Type of elements
      // Is it normalized?
      // Size of an individual vertex
      // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(attributeLocation);

    return attributeLocation;
  }

  /**
   * Fills the canvas with a background color
   * @param r red value
   * @param g green value
   * @param b blue value
   * @param a alpha value
   */
  background(r: number, g: number, b: number, a = 1): this {
    const { gl } = this;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return this;
  }

  /**
   * Draws triangles based on the index buffer
   */
  drawElements(): this {
    const { gl } = this;
    gl.drawElements(
      gl.TRIANGLES, // Type of shape
      this.indexBuffer.flatData.length, // Number of vertices
      gl.UNSIGNED_SHORT, // Type of the indices
      0 // Where to start
    );
    return this;
  }

  animate(fn: (dt: number) => void): this {
    this.animateFn = fn;
    this.time = performance.now();
    requestAnimationFrame(this.loop.bind(this));
    return this;
  }

  private loop(): void {
    // Calculate change in time
    const nowTime = performance.now();
    const dt = nowTime - this.time;
    this.time = nowTime;

    if (this.animateFn) this.animateFn(dt);
    requestAnimationFrame(this.loop.bind(this));
  }

  static screen = {
    vertexData: [
      [
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, -1]
      ]
    ],
    indexData: [
      [
        [0, 2, 3],
        [3, 1, 0]
      ]
    ]
  };
}
