<script lang="ts">
  import { goto } from '@roxi/routify';

  import Card from './Card.svelte';

  export let title: string;
  export let route: string;
  export let desc: string;
</script>

<div>
  <Card {title} on:click={() => $goto(route)}>
    <p>{desc}</p>
  </Card>
</div>

<style lang="scss">
  div {
    cursor: pointer;
    height: 100%;

    p {
      text-align: center;
    }
  }
</style>
