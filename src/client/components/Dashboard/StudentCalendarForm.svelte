<script lang="ts">
  import { APIClient } from './../../api';
  import MdiSend from './../Svg/MdiSend.svelte';
  import { RawSheetValues, SheetColumnIndex } from '../../stores/Calendar';
  import dayjs from 'dayjs';

  let { students } = $RawSheetValues;

  let studentId: string;
  let deployIdStudents: string;

  let date = dayjs();
  date = date.add(1, 'month');
  let year: number = date.year();
  let month: number = date.month() + 1;

  $: isFormCompleted = studentId && studentId !== '';

  (async () => {
    const promise = await APIClient.GetScriptProperties();
    if (promise.ok) {
      deployIdStudents = JSON.parse(promise.json).DEPLOY_ID_STUDENTS!;
    }
  })();

  const openStudentCalendar = () =>
    window.open(
      `https://script.google.com/macros/s/${deployIdStudents}/exec` +
        `?id=${studentId}&year=${year}&month=${month}`,
    );
</script>

<div class="card m-2 shadow-xl w-auto sm:w-[400px]">
  <div class="card-body">
    <div class="card-title">生徒カレンダー出力フォーム</div>

    <!-- 生徒 -->
    <select
      class="select select-bordered select-sm w-full m-1 shadow"
      bind:value={studentId}
    >
      <option value="" />
      {#each students as student}
        <option value={student[$SheetColumnIndex.students.id]}>
          {student[$SheetColumnIndex.students.name]}
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
        on:click={openStudentCalendar}
      >
        <MdiSend />
      </button>
    </div>
  </div>
</div>
