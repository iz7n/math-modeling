<h2>Executive Summary</h2>

<p>
  This paper will go into detail of an algorithm for detecting collisions
  between convex polygons known as the Separating Axis Theorem.
</p>
<p>
  The Separating Axis Theorem uses vector math to find out whether or not a gap
  exists between two shapes, thus figuring out if there is a collision. The
  problem with this approach is that it costs a lot of time and can be
  computationally expensive, so having this algorithm check for collisions as
  little as possible is ideal.
</p>
<p>
  Spatial Hash Grids and Quadtrees are two ways of minimizing these checks. A
  Spatial Hash Grid divides the space in which the shapes are in evenly, while a
  Quadtree divides it recursively and fractal-like.
</p>
<p>
  To test the performance of these two methods, I ran a stress test on the two
  methods comparing them to a naive, brute force method. The result I found lead
  me to conclude that the Quadtree was the most efficient, the Spatial Hash Grid
  not far behind, and the naive way being very slow.
</p>
