<script lang="ts">
  import ProjectionDemo from './_ProjectionDemo.svelte';
  import DotProductDemo from './_DotProductDemo.svelte';
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

<DotProductDemo />
