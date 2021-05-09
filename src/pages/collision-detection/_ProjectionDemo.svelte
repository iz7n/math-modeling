<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';
  import { Rect, vec2, Vector2 } from '@limitlesspc/limitless';

  let container: HTMLDivElement;
  let p: p5;

  const r1 = new Rect(100, 100, 50, 75);
  const r2 = new Rect(300, 100, 50, 75);

  const axis = vec2(2, 1).normalize();
  const axisY = 150;

  let dragging = false;
  const dmouse = vec2();

  onMount(() => {
    p = new p5((p: p5) => {
      const rects = [
        { shape: r1, color: p.color(108, 174, 240) },
        { shape: r2, color: p.color(245, 157, 103) }
      ];

      p.setup = () => {
        p.createCanvas(450, 300);
        p.rectMode(p.CENTER);
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

        p.stroke(0);
        p.line(0, axisY, axis.x * 1000, axisY + axis.y * 1000);

        r2.rotate(0.01);
        rects.forEach(({ shape, color }) => {
          const { x, y, width, height, angle, vertices } = shape;
          p.noStroke();

          p.push();
          p.translate(x, y);

          p.push();
          p.rotate(-angle);

          p.fill(color);
          p.rect(0, 0, width, height);

          p.pop();

          p.fill(127);

          vertices.forEach(v => p.circle(v.x, -v.y, 6));

          p.pop();

          shape.y -= axisY;
          const [min, max] = shape
            .project(axis)
            .map(n => Vector2.mult(axis, n).add(0, axisY)) as [
            min: Vector2,
            max: Vector2
          ];
          shape.y += axisY;

          color.setAlpha(150);
          p.stroke(color);
          p.strokeWeight(10);
          p.strokeCap(p.SQUARE);
          p.line(min.x, min.y, max.x, max.y);
          p.strokeWeight(1);
          color.setAlpha(255);
        });
      };
    }, container);
    return () => p.remove();
  });
</script>

<h3>Projecting along an axis</h3>
<div bind:this={container} />
