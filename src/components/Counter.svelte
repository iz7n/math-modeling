<script lang="ts">
  let count = 0;
</script>

<p>count: {count}</p>
<button on:click={() => count++}>+</button>
<button on:click={() => count--}>-</button>
