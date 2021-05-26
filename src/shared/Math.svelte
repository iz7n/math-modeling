<script lang="ts">
  import { onMount } from 'svelte';
  import Katex from 'katex';

  export let tex: string;

  let container: HTMLSpanElement;

  onMount(() => Katex.render(tex, container));
</script>

<span bind:this={container} />
