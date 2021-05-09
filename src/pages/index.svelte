<script lang="ts">
  import Tile from '$shared/Tile.svelte';

  interface Link {
    title: string;
    desc: string;
    route: string;
  }
  const links: Link[] = [
    {
      title: 'Desk Arrangement',
      desc:
        'Trying to fit as many desks in a classroom as possible while maintaining social distancing protocals.',
      route: '/desk-arrangement'
    },
    {
      title: 'Optimizing Game Collision Detection',
      desc: '',
      route: '/collision-detection'
    }
  ];
</script>

<div>
  {#each links as link}
    <Tile {...link} />
  {/each}
</div>

<style lang="scss">
  div {
    display: grid;
    $size: 250px;
    grid-template-columns: repeat(auto-fill, $size);
    grid-auto-rows: $size;
    justify-content: center;
    $gap: 25px;
    gap: $gap;
    padding: $gap;

    height: 100%;
    background-color: black;
  }
</style>
