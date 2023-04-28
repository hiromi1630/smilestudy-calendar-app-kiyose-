<script lang="ts">
  import { v4 as uuidV4 } from 'uuid';
  import { createSheetValueOfEvents } from './../../utils/createSheetValue';
  import dayjs from 'dayjs';
  import MdiPlus from './../Svg/MdiPlus.svelte';
  import MdiMinus from '../Svg/MdiMinus.svelte';
  import MdiSend from '../Svg/MdiSend.svelte';
  import {
    CalendarEvents,
    RawSheetValues,
    SheetColumnIndex,
  } from './../../stores/Calendar';
  import { APIClient } from '../../api';
  import { OverlayState, OverlayText, OverlayType } from '../../stores/Overlay';
  import { createCalendarEvents } from '../../utils/createCalendarEvents';

  let teacher: string;
  let classroom: string;
  let subject: string;
  let lessonType: string;

  type FormValue = {
    teacher: string;
    classroom: string;
    subject: string;
    lessonType: string;
    date?: string;
    timeRangeBinder?: string[];
    timeStart?: string;
    timeEnd?: string;
  };
  let formValues: FormValue[] = [];

  const addFormValues = () => {
    let defaults: FormValue | undefined;
    if (formValues.length > 0) {
      defaults = formValues.slice(-1)[0];
    }

    formValues = [
      ...formValues,
      {
        teacher,
        classroom,
        subject,
        lessonType,
        date: defaults ? defaults.date : undefined,
        timeRangeBinder: defaults ? defaults.timeRangeBinder : undefined,
        timeStart: defaults ? defaults.timeStart : undefined,
        timeEnd: defaults ? defaults.timeEnd : undefined,
      },
    ];
  };
  const removeFormValues = () => {
    if (formValues.length > 1) {
      formValues.pop();
      formValues = formValues;
    }
    console.log(formValues);
  };
  addFormValues();

  let sendingFormValues: boolean = false;
  const sendFormValues = () => {
    sendingFormValues = true;
    OverlayType.set('Loading');
    OverlayState.set(true);
    (async () => {
      const sheetValues: any[][] = [];
      for (const formValue of formValues) {
        formValue.date = formValue.date?.replaceAll('-', '/');
        sheetValues.push(
          createSheetValueOfEvents(
            uuidV4(),
            formValue.date!,
            formValue.timeStart!,
            formValue.timeEnd!,
            formValue.teacher!,
            formValue.classroom!,
            formValue.subject!,
            formValue.lessonType!,
            false,
          ),
        );
      }

      const promise = await APIClient.AddEvents(sheetValues);
      console.log(promise);
      if (promise.ok) {
        RawSheetValues.update((v) => {
          v.main.push(...sheetValues);
          return v;
        });
        CalendarEvents.set(createCalendarEvents($RawSheetValues));
        console.log($CalendarEvents);

        OverlayType.set('Success');
        OverlayText.set('データを送信しました。');
      } else if (promise.ok === false) {
        console.error(promise.error);

        OverlayType.set('Error');
        OverlayText.set(promise.error);
      }

      sendingFormValues = false;
    })();
  };

  let isFormCompleted = false;
  $: {
    for (const formValue of formValues) {
      formValue.teacher = teacher;
      formValue.subject = subject;
      formValue.classroom = classroom;
      formValue.lessonType = lessonType;
    }

    isFormCompleted = formValues.every((v) =>
      Object.entries(v).every((v) => v[1] !== undefined && v[1] !== ''),
    );
  }

  let { teachers, classrooms, subjects, lessonTypes, timePresets } =
    $RawSheetValues;
</script>

<div class="card m-2 shadow-xl w-auto sm:w-[400px]">
  <div class="card-body">
    <div class="card-title">授業登録フォーム</div>

    <div class="form-control">
      <!-- 講師 -->
      <div class="label">
        <span class="label-text">講師</span>
      </div>
      <select
        class="select select-bordered select-sm w-full m-1 shadow"
        bind:value={teacher}
      >
        <option value="" />
        {#each teachers as teacher}
          <option value={teacher[$SheetColumnIndex.teachers.id]}>
            {teacher[$SheetColumnIndex.teachers.name]}
          </option>
        {/each}
      </select>

      <!-- クラスルーム -->
      <div class="label">
        <span class="label-text">生徒（集団）</span>
      </div>
      <select
        class="select select-bordered select-sm w-full m-1 shadow"
        bind:value={classroom}
      >
        <option value="" />
        {#each classrooms as classroom}
          <option value={classroom[$SheetColumnIndex.classrooms.id]}>
            {classroom[$SheetColumnIndex.classrooms.name]}
          </option>
        {/each}
      </select>

      <!-- 教科 -->
      <div class="label">
        <span class="label-text">教科</span>
      </div>
      <select
        class="select select-bordered select-sm w-full m-1 shadow"
        bind:value={subject}
      >
        <option value="" />
        {#each subjects as subject}
          <option value={subject[$SheetColumnIndex.subjects.id]}>
            {subject[$SheetColumnIndex.subjects.name]}
          </option>
        {/each}
      </select>

      <!-- 授業種別 -->
      <div class="label">
        <span class="label-text">授業種別</span>
      </div>
      <select
        class="select select-bordered select-sm w-full m-1 shadow"
        bind:value={lessonType}
        on:change={() => {
          formValues = formValues;
        }}
      >
        <option value="" />
        {#each lessonTypes as lessonType}
          <option value={lessonType[$SheetColumnIndex.lessonTypes.id]}>
            {lessonType[$SheetColumnIndex.lessonTypes.name]}
          </option>
        {/each}
      </select>

      {#each formValues as formValue, i}
        <div class="divider">{i + 1}</div>

        <div class="label">
          <span class="label-text">日付</span>
        </div>
        <input
          bind:value={formValue.date}
          class="input input-bordered input-sm w-full m-1 shadow"
          type="date"
          name="modal"
          id=""
        />

        <div class="label">
          <span class="label-text">時間</span>
        </div>
        <select
          class="select select-bordered select-sm w-full m-1 shadow"
          bind:value={formValue.timeRangeBinder}
          on:change={() => {
            const start = formValue.timeRangeBinder
              ? formValue.timeRangeBinder[$SheetColumnIndex.timePresets.start]
              : '';
            const end = formValue.timeRangeBinder
              ? formValue.timeRangeBinder[$SheetColumnIndex.timePresets.end]
              : '';
            formValue.timeStart = dayjs(start).format('HH:mm');
            formValue.timeEnd = dayjs(end).format('HH:mm');
            formValues = formValues;
          }}
        >
          <option value="" />
          {#each timePresets as timePreset}
            <option value={timePreset}>
              {dayjs(timePreset[$SheetColumnIndex.timePresets.start]).format(
                'HH:mm',
              )} -
              {dayjs(timePreset[$SheetColumnIndex.timePresets.end]).format(
                'HH:mm',
              )}
            </option>
          {/each}
        </select>

        <div class="grid grid-cols-2">
          <input
            type="datetime"
            placeholder="開始時刻"
            class="input w-full input-sm m-1 shadow"
            bind:value={formValue.timeStart}
            on:change={() => {
              formValues = formValues;
            }}
          />
          <input
            type="datetime"
            placeholder="終了時刻"
            class="input w-full input-sm m-1 shadow"
            bind:value={formValue.timeEnd}
            on:change={() => {
              formValues = formValues;
            }}
          />
        </div>
      {/each}
    </div>

    <div class="card-actions justify-end">
      <button class="btn btn-circle btn-ghost" on:click={removeFormValues}>
        <MdiMinus />
      </button>
      <button class="btn btn-circle btn-ghost" on:click={addFormValues}>
        <MdiPlus />
      </button>
      <button
        class={`btn btn-circle ${
          isFormCompleted && !sendingFormValues ? 'btn-primary' : 'btn-disabled'
        }`}
        on:click={sendFormValues}
      >
        <MdiSend />
      </button>
    </div>
  </div>
</div>
