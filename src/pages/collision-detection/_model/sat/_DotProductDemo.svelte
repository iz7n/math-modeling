<script lang="ts">
  import Math from '$shared/Math.svelte';

  import { onMount } from 'svelte';
  import p5 from 'p5';
  import { vec2, Vector2 } from '@limitlesspc/limitless';

  let container: HTMLDivElement;
  let p: p5;

  const v = vec2(200, -100);
  const vn = Vector2.normalize(v);
  let mouse = vec2();
  $: d = mouse.dot(vn);

  onMount(() => {
    p = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(450, 450);
      };

      p.draw = () => {
        p.background(255);
        p.translate(p.width / 2, p.height / 2);

        mouse = vec2(p.mouseX - p.width / 2, p.mouseY - p.height / 2);

        p.strokeWeight(2);
        p.stroke(66, 135, 245);
        drawVec2(mouse);
        p.stroke(235, 64, 52);
        drawVec2(v);

        const n = Vector2.mult(vn, d);

        p.stroke(0);
        p.strokeWeight(4);
        p.line(0, 0, n.x, n.y);
      };

      function drawVec2(v: Vector2) {
        p.line(0, 0, v.x, v.y);

        p.push();
        p.translate(v.x, v.y);
        p.rotate(v.angle());
        p.triangle(0, 0, -10, 5, -10, -5);
        p.pop();
      }
    }, container);
    return () => p.remove();
  });
</script>

<h3>Dot product</h3>
<p>Given two vectors <Math tex="a" /> and <Math tex="b" /></p>
<Math tex="dot \ product = a_x \cdot b_x + a_y \cdot b_y" />
<p>If this were done in the <Math tex="d" />th dimension, then</p>
<Math tex="dot \ product = \displaystyle\sum_{'{'}i=1}^d a_i \cdot b_i" />
<p>
  If one of the vectors are normalized (a vector of length 1), then the dot
  product will act as a shadow.
</p>
<p>
  The blue vector will follow your mouse and a black line represents the dot
  product.
</p>
<div bind:this={container} />
<p>Dot product = {d.toFixed(1)}</p>
