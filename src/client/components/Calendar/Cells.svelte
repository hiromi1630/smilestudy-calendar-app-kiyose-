<script lang="ts">
  import DateEventsColumn from './DateEventsColumn.svelte';
  import {
    DisplayedMonth,
    SelectedDate,
    CalendarEvents,
  } from '../../stores/Calendar';
  import type { CalendarEvent, DateFormat } from '../../../client/types';
  import type { Dayjs } from 'dayjs';
  import dayjs from 'dayjs';

  const today = dayjs();

  let year = 0;
  let month = 0;

  let cells: {
    className: string;
    date: Dayjs;
    events: CalendarEvent[];
  }[] = [];

  DisplayedMonth.subscribe((v) => {
    year = v.year();
    month = v.month();

    cells.splice(0);

    let date = dayjs().year(year).month(month).date(1);
    date = date.subtract(date.day(), 'day');

    // content
    for (let i = 0; i < 7 * 6; i++) {
      const className = `btn btn-block btn-sm
        ${
          date.format('YYYYMMDD') === today.format('YYYYMMDD')
            ? 'btn-secondary btn-outline'
            : 'btn-ghost'
        }
        ${date.month() !== month ? 'btn-disabled rounded-sm' : 'rounded-full'}
        ${date.day() === 0 ? 'text-error' : ''}
        ${date.day() === 6 ? 'text-info' : ''}`;

      cells.push({
        className,
        date: dayjs(date),
        events: $CalendarEvents[date.format('YYYY/MM/DD') as DateFormat],
      });

      date = date.add(1, 'day');

      if (date.month() !== month && date.day() === 0) break;
    }

    cells = cells;
  });
</script>

{#each cells as cell}
  <div>
    <button
      type="button"
      class={cell.className}
      on:click={() => SelectedDate.set(cell.date)}
    >
      {cell.date.date()}
    </button>

    {#if cell.date.month() === month}
      <DateEventsColumn date={cell.date} />
    {/if}
  </div>
{/each}
