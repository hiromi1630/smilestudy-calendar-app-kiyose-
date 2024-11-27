<script lang="ts">
  import { APIClient } from './../../api';
  import MdiSend from './../Svg/MdiSend.svelte';
  import { RawSheetValues, SheetColumnIndex } from '../../stores/Calendar';
  import dayjs from 'dayjs';

  let { teachers } = $RawSheetValues;

  let teacherId: string;
  let deployIdTeachers: string;

  let date = dayjs();
  date = date.add(1, 'month');
  let year: number = date.year();
  let month: number = date.month() + 1;

  $: isFormCompleted = teacherId && teacherId !== '';

  (async () => {
    const promise = await APIClient.GetScriptProperties();
    if (promise.ok) {
      deployIdTeachers = JSON.parse(promise.json).DEPLOY_ID_TEACHER!;
    }
  })();

  const openTeacherCalendar = () =>
    window.open(
      `https://script.google.com/macros/s/${deployIdTeachers}/exec` +
        `?id=${teacherId}&year=${year}&month=${month}`,
    );
</script>

<div class="card m-2 shadow-xl w-auto sm:w-[400px]">
  <div class="card-body">
    <div class="card-title">講師カレンダー出力フォーム</div>

    <!-- 講師 -->
    <select
      class="select select-bordered select-sm w-full m-1 shadow"
      bind:value={teacherId}
    >
      <option value="" />
      {#each teachers as teacher}
        <option value={teacher[$SheetColumnIndex.teachers.id]}>
          {teacher[$SheetColumnIndex.teachers.name]}
        </option>
      {/each}
    </select>

    <div class="grid grid-cols-2">
      <input
        type="number"
        placeholder="年"
        class="input input-bordered w-full input-sm m-1 shadow"
        bind:value={year}
      />
      <input
        type="number"
        placeholder="月"
        class="input input-bordered w-full input-sm m-1 shadow"
        bind:value={month}
      />
    </div>

    <div class="card-actions justify-end">
      <button
        class={`btn btn-circle ${
          isFormCompleted ? 'btn-primary' : 'btn-disabled'
        }`}
        on:click={openTeacherCalendar}
      >
        <MdiSend />
      </button>
    </div>
  </div>
</div>
