<script lang="ts">
  import Math from '$shared/Math.svelte';
  import Structure from './_Structure.svelte';
  import Compare from './_Compare.svelte';
</script>

<h3>Optimization</h3>

<p>
  The most naive way to check collisions between many objects is by checking
  each object against every other object.
</p>
<p>
  This means that if you had 10 objects, you would have to make 90 check because
  there are 10 objects, times 9 checks for each object since checking an object
  against itself is useless.
</p>
<p>
  In general, if you have <Math tex="n" /> objects, you will be making <Math
    tex="n(n-1)"
  /> checks which is very close to <Math tex="n^2" /> making it slow.
</p>
<p>
  However, there are better ways to go about this: the Spatial Hash Grid and
  Quadtree
</p>

<Structure structure="hashgrid" />
<Structure structure="quadtree" />

<Compare />
