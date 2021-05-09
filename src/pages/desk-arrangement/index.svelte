<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';

  import Card from '../../shared/Card.svelte';

  import { room, pixelsPerFoot } from './config';

  let div: HTMLDivElement;

  let totalDesks = 0;
  let socialDistance = 6;
  let deskDepth = 18 / 12;
  let deskWidth = 24 / 12;

  const twidth = 6;
  const tdepth = 8;

  onMount(() => {
    new p5((p: p5) => {
      p.setup = () => {
        let canvas = p
          .createCanvas(room.width * pixelsPerFoot, room.depth * pixelsPerFoot)
          .style('border', '5px solid #C97F50');
        div.prepend(canvas.elt);
      };

      p.draw = () => {
        p.background(255);
        drawRedAreas();
        drawGrid();
        totalDesks = drawDesks();
        drawText();
      };

      function drawDesks(): number {
        let total = 0;

        // Teacher's desk
        const tx = room.width - twidth;
        const ty = room.depth - tdepth;
        drawDesk(tx, ty, twidth, tdepth);

        // Students' desks
        for (
          let x = 0;
          x + deskWidth <= room.width - socialDistance;
          x += Math.max(socialDistance, deskWidth)
        ) {
          for (
            let y = socialDistance;
            y + deskDepth <= room.depth;
            y += Math.max(socialDistance, deskDepth)
          ) {
            const cx = x + deskWidth / 2;
            const cy = y + deskDepth / 2;
            if (
              (cx - (tx + twidth / 2)) ** 2 + (cy - (ty + tdepth / 2)) ** 2 <
              socialDistance ** 2
            )
              continue;
            if (x + deskWidth > tx && y + deskDepth > ty) continue;

            drawDesk(x, y, deskWidth, deskDepth);
            total++;
          }
        }

        return total;
      }

      function drawDesk(x: number, y: number, width: number, depth: number) {
        p.stroke(0);
        p.strokeWeight(1);
        p.fill('#7B4B2E');
        p.rect(
          x * pixelsPerFoot,
          y * pixelsPerFoot,
          width * pixelsPerFoot,
          depth * pixelsPerFoot
        );
        p.strokeWeight(4);
        p.point(
          (x + width / 2) * pixelsPerFoot,
          (y + depth / 2) * pixelsPerFoot
        );
      }

      function drawRedAreas() {
        p.noStroke();
        p.fill(255, 0, 0);
        p.rect(0, 0, p.width, socialDistance * pixelsPerFoot);
        p.rect(
          p.width - socialDistance * pixelsPerFoot,
          0,
          socialDistance * pixelsPerFoot,
          p.height
        );
      }

      function drawGrid() {
        p.strokeWeight(1);
        for (let x = 0; x <= p.width; x += pixelsPerFoot) {
          p.stroke(127);
          p.noFill();
          p.line(x, 0, x, p.height);
        }
        for (let y = 0; y <= p.height; y += pixelsPerFoot) {
          p.stroke(127);
          p.noFill();
          p.line(0, y, p.width, y);
        }
      }

      function drawText() {
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER);
        p.text('Dry erase board', p.width / 2, 20);
        p.text('Door', p.width - 20, 35);
        p.text("Teacher's desk", p.width - 40, p.height - 85);
      }
    }, div);
  });
</script>

<div class="grid">
  <div class="center" bind:this={div} />
  <Card title="Desk Arrangement">
    <div class="topics">
      <div>
        <b>Problem</b>
        <p>
          How many desks can fit in the classroom while socially distancing?
        </p>
      </div>
      <div>
        <b>Assumptions</b>
        <ul>
          <li>The room is {room.width}ft wide and {room.depth}ft long.</li>
          <li>The teacher's desk is {twidth}ft wide and {tdepth}ft long.</li>
          <li>
            The teacher needs <b class="variable">{socialDistance.toFixed(2)}</b
            >ft of walking space to get to the whiteboard.
          </li>
        </ul>
      </div>
      <div>
        <p><b>Variables</b> (drag the sliders to change each variable)</p>
        <p>Desks: {totalDesks}</p>
        <div>
          <span>Social Distance</span>
          <input
            type="range"
            min={1}
            max={9}
            step={0.25}
            bind:value={socialDistance}
          />
          <span>{socialDistance}ft</span>
        </div>
        <div>
          <span>Desk Width</span>
          <input
            type="range"
            min={1}
            max={5}
            step={0.25}
            bind:value={deskWidth}
          />
          <span>{deskWidth}ft</span>
        </div>
        <div>
          <span>Desk Depth</span>
          <input
            type="range"
            min={1}
            max={5}
            step={0.25}
            bind:value={deskDepth}
          />
          <span>{deskDepth}ft</span>
        </div>
      </div>
      <div>
        <b>Solution</b>
        <p>
          With a desk width of <b class="variable">{deskWidth.toFixed(2)}</b>ft,
          desk height of <b class="variable">{deskDepth.toFixed(2)}</b>ft, and
          social distance protocal of
          <b class="variable">{socialDistance.toFixed(2)}</b>ft,
          <b class="variable">{totalDesks}</b> student desks can fit in the classroom.
        </p>
      </div>
      <div>
        <b>Analysis</b>
        <p>Strengths</p>
        <ul>
          <li>This is a great visualization of the problem.</li>
          <li>
            This takes into account the space the teacher needs to get to the
            dry erase board.
          </li>
        </ul>
        <p>Weaknesses</p>
        <ul>
          <li>
            This does not take into account spacing between the desks for
            students to walking in and out of the classroom.
          </li>
          <li>The room size cannot be changed.</li>
        </ul>
        <p>
          For the initial values of the problem, only 11 desks can fit in the
          classroom, however we have 13 students so this solution will not work
          for us. The social distance length changes the number of desks that
          can fit in the classroom by a lot as the distance becomes shorter.
          Possibly, if the desks were arranged along diagonals, then more desks
          could fit.
        </p>
      </div>
    </div>
  </Card>
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template: auto 1fr / 1fr;
    justify-content: center;
    align-content: center;
    $gap: 20px;
    gap: $gap;
    padding: $gap;
    height: 100%;
    background-color: black;
  }
  .center {
    display: grid;
    justify-content: center;
  }
  .topics {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    > div {
      border-bottom: 1px solid grey;
      padding-bottom: 10px;
    }
  }
  .variable {
    font-family: monospace;
    font-size: 12pt;
  }
</style>
