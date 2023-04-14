<script lang="ts">
  import { DisplayedMonth, SelectedDate } from './stores';
  import dayjs, { Dayjs } from 'dayjs';

  let year = 0;
  let month = 0;

  let cells: {
    dim: boolean;
    date: Dayjs;
  }[] = [];

  DisplayedMonth.subscribe((v) => {
    year = v.year();
    month = v.month();

    cells.splice(0);

    let date = dayjs().year(year).month(month).date(1);
    date = date.subtract(date.day(), 'day');

    // content
    for (let i = 0; i < 7 * 6; i++) {
      cells = [
        ...cells,
        {
          dim: date.month() !== month,
          date: date.clone(),
        },
      ];

      date = date.add(1, 'day');

      if (date.month() !== month && date.day() === 0) break;
    }
  });
</script>

{#each cells as cell}
  <div>
    <button
      type="button"
      class={`btn btn-block btn-ghost btn-sm ${
        cell.dim ? 'btn-disabled rounded-none' : ''
      }`}
      on:click={() => SelectedDate.set(dayjs(cell.date))}
    >
      {cell.date.date()}
    </button>
  </div>
{/each}
