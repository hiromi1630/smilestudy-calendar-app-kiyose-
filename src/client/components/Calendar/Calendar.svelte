<script lang="ts">
  import MdiLightChevronRight from '../Svg/MdiLightChevronRight.svelte';
  import MdiLightChevronLeft from './../Svg/MdiLightChevronLeft.svelte';
  import Header from './Header.svelte';
  import { DisplayedMonth, SelectedDate } from '../../stores/Calendar';
  import Cells from './Cells.svelte';
  import DateEventsColumn from './DateEventsColumn.svelte';
</script>

<div class="lg:flex flex-row">
  <div class="basis-3/4">
    <div class="grid grid-cols-7 m-3">
      <Header />
      <Cells />
    </div>
    <div class="grid grid-cols-2 m-3">
      <button class="btn btn-block btn-ghost" on:click={DisplayedMonth.prev}>
        <MdiLightChevronLeft />
      </button>
      <button class="btn btn-block btn-ghost" on:click={DisplayedMonth.next}>
        <MdiLightChevronRight />
      </button>
    </div>
  </div>
  <div class="basis-1/4 mx-20">
    <DateEventsColumn date={$SelectedDate} showDivider />
  </div>
</div>
