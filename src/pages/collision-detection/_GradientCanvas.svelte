<script lang="ts">
  import { onMount } from 'svelte';

  import GL from './gl';
  import vertex from './vertex.vert';
  import fragment from './fragment.frag';

  let canvas: HTMLCanvasElement;
  let gl: GL;
  let timeUniform: WebGLUniformLocation;

  onMount(() => {
    // Setup
    gl = new GL(canvas);

    gl.setSize();
    window.addEventListener('resize', gl.setSize.bind(gl));

    // Create program
    gl.createProgramFromSources(vertex, fragment);

    // Create buffers
    gl.createVertexBuffer(GL.screen.vertexData);
    gl.createIndexBuffer(GL.screen.indexData);

    // Create attribute
    gl.createAttribute('position', [
      2,
      gl.gl.FLOAT,
      false,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    ]);

    // Bind uniform
    timeUniform = gl.getUniformLocation('seconds')!;
    const offset = Math.random() * 1000 - 500;

    // Render loop
    gl.animate(() => {
      // Set uniform
      gl.gl.uniform1f(timeUniform, performance.now() / 1000 + offset);

      // Render
      gl.drawElements();
    });
  });
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    width: 100%;
    height: 30%;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
  }
</style>
