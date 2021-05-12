<script lang="ts">
  import GradientCanvas from './_GradientCanvas.svelte';
</script>

<GradientCanvas />
<div>
  <slot />
</div>

<style>
  div {
    margin: auto;
    padding: 16px;
    max-width: 816px;
  }
</style>
