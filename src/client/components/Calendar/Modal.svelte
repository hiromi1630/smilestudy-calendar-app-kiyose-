<script lang="ts">
  import {
    OverlayText,
    OverlayType,
    OverlayState,
  } from './../../stores/Overlay';
  import {
    CalendarEvents,
    EventButtonType,
    RawSheetValues,
  } from './../../stores/Calendar';
  import MdiDeleteOutline from './../Svg/MdiDeleteOutline.svelte';
  import { APIClient } from '../../api';
  import type { CalendarEvent } from '../../types';
  import { createCalendarEvents } from '../../utils/createCalendarEvents';
  import 'dayjs/locale/ja';

  export let modalId: string;
  export let event: CalendarEvent;

  let isShowingConfirmBlock: boolean = false;
  let isDeletingEvent: boolean = false;

  $: ({
    id,
    timeStart,
    timeEnd,
    teacher,
    classroom,
    subject,
    date,
    lessonType,
  } = event);
</script>

<input type="checkbox" id={modalId} class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle cursor-pointer">
  {#if !isShowingConfirmBlock}
    <div class="modal-box relative">
      <!-- Title -->
      <div class="font-bold text-2xl py-4">
        {date.locale('ja').format('YYYY年 MM月 DD日 (dd)')}
      </div>

      <!-- Contents -->
      <p class="font-bold text-lg py-2">{`${timeStart} - ${timeEnd}`}</p>
      <p>{`講師： ${teacher.name}`}</p>
      <p>{`生徒： ${classroom.name}`}</p>
      <p>{`教科： ${subject.name} （${lessonType.name}）`}</p>

      <div class="modal-action">
        {#if $EventButtonType !== 'Subject'}
          <button
            type="button"
            class="btn btn-error"
            on:click={() => {
              isShowingConfirmBlock = true;
            }}
          >
            <MdiDeleteOutline />
          </button>
        {/if}
        <label for={modalId} class="btn"> Close </label>
      </div>
    </div>
  {:else}
    <div class="modal-box relative">
      <h4 class="font-bold text-lg py-4">本当に消去しますか？</h4>
      <div class="modal-action">
        <button
          type="button"
          class={`btn ${isDeletingEvent ? 'btn-disabled' : ''}`}
          on:click={() => {
            isShowingConfirmBlock = false;
          }}
        >
          No
        </button>
        <label
          for={modalId}
          class={`btn ${
            isDeletingEvent ? 'btn-disabled loading' : 'btn-error'
          }`}
          on:click={() => {
            isDeletingEvent = true;

            OverlayState.set(true);
            OverlayType.set('Loading');
            (async () => {
              const promise = await APIClient.DeleteEventById(id);
              if (promise.ok) {
                RawSheetValues.update((v) => {
                  v.main = v.main.filter((v) => v[0] !== id);
                  return v;
                });
                console.log($RawSheetValues);
                CalendarEvents.set(createCalendarEvents($RawSheetValues));
                console.log($CalendarEvents);

                OverlayText.set('削除しました。');
                OverlayType.set('Success');
              } else {
                alert(promise.error);
                OverlayText.set(
                  String(promise.error) + ' - ページをリロードしてください。',
                );
                OverlayType.set('Error');
              }

              isShowingConfirmBlock = false;
              isDeletingEvent = false;
            })();
          }}
        >
          Yes
        </label>
      </div>
    </div>
  {/if}
</div>
