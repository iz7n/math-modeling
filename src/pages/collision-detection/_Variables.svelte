<script lang="ts">
  import Math from '$shared/Math.svelte';

  let numObjects = 1000;
  let capacity = 4;
  let divisionSize = 100;
</script>

<h2>Variables</h2>

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Symbol</th>
      <th>Description</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Number of objects</td>
      <td><Math tex="n" /></td>
      <td>The amount of objects in the physics simulation</td>
      <td>
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          bind:value={numObjects}
        />
        {numObjects}
      </td>
    </tr>
  </tbody>

  <p><b>Quadtree</b></p>
  <tbody>
    <tr>
      <td>Capacity</td>
      <td><Math tex="c" /></td>
      <td>The maximum number of object in each quadtree cell</td>
      <td>
        <input type="range" min={1} max={10} step={1} bind:value={capacity} />
        {capacity}
      </td>
    </tr>
  </tbody>

  <p><b>Spatial Hash Grid</b></p>
  <tbody>
    <tr>
      <td>Division size</td>
      <td><Math tex="d" /></td>
      <td>The length & width of each cell in the grid</td>
      <td>
        <input
          type="range"
          min={10}
          max={200}
          step={10}
          bind:value={divisionSize}
        />
        {divisionSize}
      </td>
    </tr>
  </tbody>
</table>

<style>
  table {
    border: 1px solid black;
  }
</style>
