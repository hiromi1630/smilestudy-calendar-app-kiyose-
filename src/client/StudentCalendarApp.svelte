<script lang="ts">
  import {
    EventButtonType,
    DisplayedMonth,
    SheetColumnIndex,
    CalendarEvents,
    RawSheetValues,
  } from './stores/Calendar';
  import NavigationBar from './components/NavigationBar/NavigationBar.svelte';
  import { APIClient } from './api';
  import Calendar from './components/Calendar/Calendar.svelte';
  import Overlay from './components/Overlay/Overlay.svelte';
  import Tailwind from './components/Tailwind.svelte';
  import { OverlayState, OverlayText, OverlayType } from './stores/Overlay';
  import { ThemeIndex, Themes } from './stores/Theme';
  import { assert } from './utils/assert';
  import { createCalendarEvents } from './utils/createCalendarEvents';
  import { getLocation } from './utils/getParams';

  let year: number, month: number;
  DisplayedMonth.subscribe((v) => {
    year = v.year();
    month = v.month();
  });

  EventButtonType.set('Subject');

  (async () => {
    try {
      const params = (await getLocation()).parameter;
      const studentId = params.id;
      assert(
        studentId && studentId.length > 0,
        'パラメータにIDが指定されていません。\nお手数ですが、講師に再度URLを発行させて下さい。',
      );

      if (params.year) {
        DisplayedMonth.year(parseInt(params.year));
      }
      if (params.month) {
        DisplayedMonth.month(parseInt(params.month) - 1);
      }

      const promise = await APIClient.LoadDataFromSheet(false);

      if (promise.ok) {
        const sheetValues: Sheet = JSON.parse(promise.json);

        // target classroom ids array
        const classrooms: string[] = sheetValues.classrooms
          .filter((classroom) =>
            classroom.slice(2).some((v) => v === studentId),
          )
          .reduce((acc, v) => [...acc, v[0]], []);

        sheetValues.main = sheetValues.main.filter((v) =>
          classrooms.some((e) => e === v[$SheetColumnIndex.main.classroom]),
        );

        RawSheetValues.set(sheetValues);
        CalendarEvents.set(createCalendarEvents($RawSheetValues));

        console.log($CalendarEvents);

        OverlayState.set(false);
      } else if (promise.ok === false) {
        console.error(promise.error.message);

        OverlayText.set(promise.error.message);
        OverlayType.set('Error');
      }
    } catch (error) {
      OverlayText.set(String(error));
      OverlayType.set('Error');
    }
  })();
</script>

<Tailwind />

<main data-theme={$Themes[$ThemeIndex]}>
  <div class="drawer">
    <div class="drawer-content">
      <NavigationBar sideBar={false}>
        <div slot="start">
          <button class="btn btn-ghost normal-case text-xl">
            {year}年 {month + 1}月
          </button>
        </div>
        <Calendar />
      </NavigationBar>
      <Overlay />
    </div>
  </div>
</main>
