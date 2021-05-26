<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';
  import { ConvexPolygon, vec2, World } from '@limitlesspc/limitless';

  let container: HTMLDivElement;
  let p: p5;

  onMount(() => {
    p = new p5((p: p5) => {
      const world = new World(0, 0, 200, 200, 'naive');
      let body: ConvexPolygon;

      p.setup = () => {
        p.createCanvas(200, 200);

        body = new ConvexPolygon(p.width / 2, p.height / 2, [
          vec2(50, -60),
          vec2(30, 40),
          vec2(-70, 50),
          vec2(-50, -70)
        ]);
        world.add(body);
      };

      p.draw = () => {
        p.background(255);

        body.rotate(-0.005);
        world.render(p, {
          vertices: true,
          normals: true
        });
      };
    }, container);
    return () => p.remove();
  });
</script>

<h3>Normals</h3>
<p>
  Normals are vector of length 1 that point outward perpendicular to each edge
  on a shape (in 3D, each face).
</p>
<p>Blue lines represent normals.</p>
<div bind:this={container} />

<style>
  div :global(canvas) {
    border: 4px solid black;
  }
</style>
