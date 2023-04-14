<script lang="ts">
  import dayjs from 'dayjs';
  import 'dayjs/locale/ja';

  let date = dayjs().day(0).locale('ja');

  const result: {
    text: string;
  }[] = [];

  do {
    const text = date.format('ddd');

    result.push({
      text,
    });

    date = date.add(1, 'day');
  } while (date.day() !== 0);
</script>

{#each result as item}
  <div class="">
    <button type="button" class="btn btn-block btn-ghost btn-sm no-animation">
      {item.text}
    </button>
  </div>
{/each}
