<script lang="ts">
  import MdiLightChevronRight from '../Svg/MdiLightChevronRight.svelte';
  import MdiLightChevronLeft from './../Svg/MdiLightChevronLeft.svelte';
  import Header from './Header.svelte';
  import { DisplayedMonth, SelectedDate } from '../../stores/Calendar';
  import Cells from './Cells.svelte';
  import DateEventsColumn from './DateEventsColumn.svelte';

  let width = 0;
</script>

<div class="lg:flex flex-row">
  <div class="basis-3/4">
    <div class="grid grid-cols-7 m-1" bind:clientWidth={width}>
      <Header />
      <Cells {width} />
    </div>
    <div class="grid grid-cols-2 m-1">
      <button class="btn btn-block btn-ghost" on:click={DisplayedMonth.prev}>
        <MdiLightChevronLeft />
      </button>
      <button class="btn btn-block btn-ghost" on:click={DisplayedMonth.next}>
        <MdiLightChevronRight />
      </button>
    </div>
  </div>
  <div class="basis-1/4 mx-20">
    <DateEventsColumn date={$SelectedDate} showDivider width={width - 40} />
  </div>
</div>
