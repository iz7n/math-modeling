<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';
  import {
    ConvexPolygon,
    random,
    Vector2,
    World
  } from '@limitlesspc/limitless';

  export let structure: 'hashgrid' | 'quadtree';

  let container: HTMLDivElement;
  let p: p5;

  const size = 400;

  onMount(() => {
    p = new p5((p: p5) => {
      const world = new World(0, 0, size, size, structure, {
        divisionSize: 80,
        capacity: 1
      });

      p.setup = () => {
        p.createCanvas(size, size);

        for (let i = 0; i < 10; i++) {
          world.add(randomPoly());
        }
      };

      p.draw = () => {
        p.background(255);

        world.update(p.deltaTime / 1000);
        world.render(p, {
          structure: true
        });
      };

      function randomPoly(): ConvexPolygon {
        const vertices: Vector2[] = [];
        for (
          let angle = 0;
          angle < Math.PI * 2;
          angle += Math.PI / random(2, 6)
        ) {
          vertices.push(Vector2.random(25).setAngle(angle));
        }
        const body = new ConvexPolygon(
          random(p.width),
          random(p.height),
          vertices
        );
        body.velocity = Vector2.random(random(100));
        return body;
      }
    }, container);
    return () => p.remove();
  });
</script>

{#if structure === 'hashgrid'}
  <h3>Spatial Hash Grid</h3>
  <p>
    A Spatial Hash Grid divides up the space into evenly-sized cells which
    contain the objects that they intersect. To check for collisions for any
    given object, only the neighboring cells need to be checked, not every
    single object.
  </p>
  <p>Division/cell size: 80 pixels</p>
{:else}
  <h3>Quadtree</h3>
  <p>
    A Quadtree divides the space into 4 quadrants. Each quadrant can hold a
    certain number of object, known as its <i>capacity</i>. If the number of
    objects goes past the capacity, then that quadrant is divided up into 4 more
    quadrants.
  </p>
  <p>Capacity: 1</p>
{/if}
<div bind:this={container} />
