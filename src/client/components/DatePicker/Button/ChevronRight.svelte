<script>
  import MdiLightChevronRight from '../../Svg/MdiLightChevronRight.svelte';

  import { DisplayedMonth } from '../stores';
</script>

<button class="btn btn-circle btn-ghost" on:click={DisplayedMonth.next}>
  <MdiLightChevronRight />
</button>
