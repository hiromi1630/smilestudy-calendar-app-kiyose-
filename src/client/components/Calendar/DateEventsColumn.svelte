<script lang="ts">
  import EventButton from './EventButton.svelte';
  import { CalendarEvents } from '../../stores/Calendar';
  import dayjs, { Dayjs } from 'dayjs';
  import 'dayjs/locale/ja';
  import type { DateFormat } from 'src/client/types';

  export let date: Dayjs = dayjs();
  export let showDivider: boolean = false;

  $: events = $CalendarEvents[date.format('YYYY/MM/DD') as DateFormat];

  // let latestStartTime: string | undefined;
</script>

<div class="m-1">
  {#if events}
    {#if showDivider}
      <div class="divider">
        {events[0].date.locale('ja').format('YYYY年 M月D日（dd）')}
      </div>
    {/if}
    {#each events as event}
      <!-- Divider -->
      <!-- {#if showDivider && latestStartTime !== event.timeStart}
        <div class="divider">
          {(latestStartTime = event.timeStart)}
        </div>
      {/if} -->

      <!-- Event  -->
      <EventButton {event} />
    {/each}
  {/if}
</div>
