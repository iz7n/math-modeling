<h3>Naive vs. Spatial Hash Grid vs. Quadtree</h3>

<p>
  Using 1,000 objects and checking the entire sysytem 1,000 times with 3 trials,
  the times that each method of optimization took was:
</p>

<p>
  The Spatial Hash Grid had a division size of 80 and the Quadtree had a
  capacity of 4.
</p>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Time (s)</th>
      <th>Average Time (s)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Naive</td>
      <td>102.79</td>
      <td>129.1</td>
    </tr>
    <tr>
      <td />
      <td>145.69</td>
    </tr>
    <tr>
      <td />
      <td>138.82</td>
    </tr>

    <tr>
      <td>Spatial Hash Grid</td>
      <td>6.72</td>
      <td>6.40</td>
    </tr>
    <tr>
      <td />
      <td>6.16</td>
    </tr>
    <tr>
      <td />
      <td>6.33</td>
    </tr>

    <tr>
      <td>Quadtree</td>
      <td>4.48</td>
      <td>4.73</td>
    </tr>
    <tr>
      <td />
      <td>4.92</td>
    </tr>
    <tr>
      <td />
      <td>4.79</td>
    </tr>
  </tbody>
</table>

<p>
  Based on the data tested, it is quite clear that the naive way of collision
  detection is extremely slow at scale and the quadtree is the fastest way.
</p>

<style>
  table {
    border: 1px solid black;
  }
</style>
