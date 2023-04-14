<script lang="ts">
  import { WEEKDAYS } from '../../stores/Calendar';

  const date = new Date();
  date.setDate(date.getDate() - date.getDay());

  const result: {
    text: string;
    className: string;
  }[] = [];

  do {
    const text = date.toLocaleDateString('ja-JP', {
      weekday: 'short',
    });

    const className =
      'btn btn-block btn-sm no-animation rounded-none ' +
      (date.getDay() === $WEEKDAYS.SUN ? 'btn-error rounded-tl' : '') +
      (date.getDay() === $WEEKDAYS.SAT ? 'btn-info rounded-tr' : '');

    result.push({
      text,
      className,
    });

    date.setDate(date.getDate() + 1);
  } while (date.getDay() !== 0);
</script>

{#each result as item}
  <div class="">
    <button type="button" class={item.className}>
      {item.text}
    </button>
  </div>
{/each}
