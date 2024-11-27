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
  import { calcLessons } from './utils/calcLesson';
  import { LessonNum } from './types';

  let lessonNum: LessonNum = {};
  let year: number, month: number;
  DisplayedMonth.subscribe((v) => {
    year = v.year();
    month = v.month();
  });

  EventButtonType.set('Teacher');

  (async () => {
    try {
      const params = (await getLocation()).parameter;
      const teacherId = params.id;
      assert(
        teacherId && teacherId.length > 0,
        'パラメータにIDが指定されていません。もう一度カレンダーアプリからアクセスしてみてください。',
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

        // target teacher ids array
        const teachers: string[] = sheetValues.teachers
          .filter((teacher) => teacher.slice(0).some((v) => v === teacherId))
          .reduce((acc, v) => [...acc, v[0]], []);

        sheetValues.main = sheetValues.main.filter((v) =>
          teachers.some((e) => e === v[$SheetColumnIndex.main.teacher]),
        );

        RawSheetValues.set(sheetValues);
        CalendarEvents.set(createCalendarEvents($RawSheetValues));
        lessonNum = calcLessons($RawSheetValues, year, month);
        console.log($CalendarEvents);

        OverlayState.set(false);
      } else if (promise.ok === false) {
        console.error(promise.error);

        OverlayText.set(promise.error);
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
  <div class="drawer overflow-y-scroll">
    <div class="drawer-content">
      <NavigationBar sideBar={false}>
        <div slot="start">
          <button class="btn btn-ghost normal-case text-lg">
            {year}年 {month + 1}月
          </button>
        </div>
        <Calendar />
      </NavigationBar>
      <Overlay />
    </div>
  </div>
</main>
