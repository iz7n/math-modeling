<script lang="ts">
  import Header from '../components/Header.svelte';
</script>

<div>
  <Header />
  <slot />
</div>

<style>
  div {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }
</style>
