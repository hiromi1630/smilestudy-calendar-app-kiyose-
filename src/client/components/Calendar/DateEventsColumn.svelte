<script lang="ts">
  import EventButton from './EventButton.svelte';
  import { CalendarEvents } from '../../stores/Calendar';
  import dayjs, { Dayjs } from 'dayjs';
  import 'dayjs/locale/ja';
  import type { DateFormat } from 'src/client/types';

  export let date: Dayjs = dayjs();
  export let showDivider: boolean = false;
  export let width: number = 0;

  $: events = $CalendarEvents[date.format('YYYY/MM/DD') as DateFormat];
</script>

<div class="m-[1px]">
  {#if events}
    {#if showDivider}
      <div class="divider">
        {events[0].date.locale('ja').format('YYYY年 M月D日（dd）')}
      </div>
    {/if}
    {#each events as event}
      <!-- Event -->
      <EventButton {event} width={width - 2} />
    {/each}
  {/if}
</div>
