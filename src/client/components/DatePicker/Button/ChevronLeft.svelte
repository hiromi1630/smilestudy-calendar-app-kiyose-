<script>
  import MdiLightChevronLeft from '../../Svg/MdiLightChevronLeft.svelte';

  import { DisplayedMonth } from '../stores';
</script>

<button class="btn btn-circle btn-ghost" on:click={DisplayedMonth.prev}>
  <MdiLightChevronLeft />
</button>
