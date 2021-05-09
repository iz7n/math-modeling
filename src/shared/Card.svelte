<script lang="ts">
  export let title = '';
</script>

<div on:click>
  {#if title}
    <h2>{title}</h2>
  {/if}
  <slot />
</div>

<style lang="scss">
  div {
    padding: 15px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    height: 100%;
    background-color: white;

    h2 {
      margin: 0;
      margin-bottom: 10px;
      border-bottom: 1px solid black;
      padding-bottom: 5px;
      text-align: center;
    }
  }
</style>
