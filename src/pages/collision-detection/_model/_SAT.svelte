<script lang="ts">
  import ProjectionDemo from './_ProjectionDemo.svelte';
  import NormalDemo from './_NormalDemo.svelte';
  import DotProductDemo from './_DotProductDemo.svelte';
  import Math from '$shared/Math.svelte';
</script>

<h3>Separating Axis Theorem (SAT)</h3>
<p>
  In non mathematical terms, the Separating Axis Theorem is a way to determine
  weather or not 2 convex shapes are intersecting or colliding.
</p>
<p>
  Imagine you are in a room with a flashlight that emits light perfectly
  parallel and there are two objects in front of you. To determine whether or
  not they are intersecting, you turn on you flashlight and point it at the
  objects. You then proceed to walk in a circle around the objects observing the
  shadows they cast on the wall. If at any time during your walk you see a gap
  in their 2 shadows, then they must not be intersecting. However, if you never
  see a gap, then they must be intersecting.
</p>

<ProjectionDemo />

<NormalDemo />

<h3>Normalization</h3>

<p>
  A vector that is normalized is one that has a length of 1. Normalizing a
  vector is as simple as dividing it by its length.
</p>

<Math tex="normalized = {'{'}v \over ||v||}" /> where <Math tex="||v||" /> is the
length of the vector.

<DotProductDemo />

<p>
  The first demo uses the dot products of each vertex on the two rectangles
  along a normalized axis. The minimum and maximum of these dot products are
  then used to draw the shadows of each shape.
</p>
<p>
  <u>Note</u>: the position of the axis does not matter, it is just for display
  purposes.
</p>
