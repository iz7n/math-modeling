<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';
  import {
    degrees,
    overlap,
    Rect,
    vec2,
    Vector2,
    World
  } from '@limitlesspc/limitless';

  let container: HTMLDivElement;
  let p: p5;

  const world = new World(0, 0, 450, 450);
  let r1: Rect;
  let r2: Rect;
  let rects: [
    { shape: Rect; color: p5.Color },
    { shape: Rect; color: p5.Color }
  ];

  let angle = 0.57;
  $: axis = vec2(1, 0).setAngle(angle);
  const axisDist = 160;

  let dragging = false;
  const dmouse = vec2();

  onMount(() => {
    p = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(450, 450);
        p.rectMode(p.CENTER);

        r1 = new Rect(p.width / 2 - 50, p.height / 2, 50, 75);
        r2 = new Rect(p.width / 2 + 50, p.height / 2, 50, 75);
        world.bodies.push(r1, r2);
        rects = [
          { shape: r1, color: p.color(108, 174, 240) },
          { shape: r2, color: p.color(245, 157, 103) }
        ];
      };

      p.mousePressed = () => {
        const mouse = vec2(p.mouseX, p.mouseY);
        const min = Vector2.sub(r1.position, Vector2.div(r1.size, 2));
        const max = Vector2.add(min, r1.size);
        const clampped = Vector2.clamp(mouse, min, max);
        if (clampped.equals(mouse)) {
          dragging = true;
          dmouse.set(Vector2.sub(r1.position, mouse));
        }
      };
      p.mouseDragged = () => {
        if (dragging) {
          const mouse = vec2(p.mouseX, p.mouseY);
          r1.position.set(Vector2.add(mouse, dmouse));
        }
      };
      p.mouseReleased = () => (dragging = false);

      p.draw = () => {
        p.background(255);

        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.rotate(angle);
        p.translate(-p.width / 2, -axisDist);

        p.stroke(0);
        p.strokeWeight(2);
        p.line(0, 0, p.width, 0);

        r2.rotate(0.01);

        const offset = vec2(0, axisDist).rotateAbout(
          angle,
          vec2(p.width / 2, p.height / 2)
        );
        const projections = rects.map(({ shape, color }) => {
          shape.position.sub(offset);
          const [min, max] = shape.project(axis);
          shape.position.add(offset);

          p.stroke(color);
          p.strokeWeight(10);
          p.strokeCap(p.SQUARE);
          p.line(min, 0, max, 0);

          return [min, max] as const;
        });

        const [p1, p2] = projections;
        const o = overlap(...p1, ...p2);
        if (o > 0) {
          const values = [...p1, ...p2];
          const [min, max] = values.minmax();
          p.stroke(255, 0, 0);
          p.line(min, 0, max, 0);
        }

        p.pop();

        world.render(p);
      };
    }, container);
    return () => p.remove();
  });
</script>

<h3>Projecting along an axis</h3>
<p>
  Click and drag the vertical rectangle to see different results. The blue and
  orange lines represent the "shadows" that the rectangles cast on to the wall.
</p>
<div bind:this={container} />
<input type="range" min={0} max={2 * Math.PI} step={0.01} bind:value={angle} />
<span>{(angle / Math.PI).toFixed(2)}π rad ({degrees(angle).toFixed(0)}°)</span>
<p>
  Notice how if the two rectangles are colliding, then their shadows will never
  have a gap or become red, no matter the projection angle.
</p>

<style>
  div :global(canvas) {
    border-radius: 50%;
  }
</style>
