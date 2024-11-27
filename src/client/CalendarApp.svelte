<script lang="ts">
  import ClassRegistrationForm from './components/Dashboard/ClassRegistrationForm.svelte';
  import Drawer from './components/Drawer/Drawer.svelte';
  import {
    CalendarEvents,
    DisplayedMonth,
    RawSheetValues,
  } from './stores/Calendar';
  import Calendar from './components/Calendar/Calendar.svelte';
  import NavigationBar from './components/NavigationBar/NavigationBar.svelte';
  import Tailwind from './components/Tailwind.svelte';
  import { ThemeIndex, Themes } from './stores/Theme';
  import { createCalendarEvents } from './utils/createCalendarEvents';
  import { APIClient } from './api';
  import { CurrentPage, PageId } from './stores/Page';
  import { OverlayState, OverlayText, OverlayType } from './stores/Overlay';
  import Overlay from './components/Overlay/Overlay.svelte';
  import MdiCalendarToday from './components/Svg/MdiCalendarToday.svelte';
  import StudentCalendarForm from './components/Dashboard/StudentCalendarForm.svelte';
  import TeacherCalendarForm from './components/Dashboard/TeacherCalendarForm.svelte';

  OverlayType.set('Loading');
  OverlayState.set(true);

  let year: number, month: number;
  DisplayedMonth.subscribe((v) => {
    year = v.year();
    month = v.month();
  });

  (async () => {
    try {
      const promise = await APIClient.LoadDataFromSheet(false);
      if (promise.ok) {
        RawSheetValues.set(JSON.parse(promise.json));
        console.log($RawSheetValues);
        CalendarEvents.set(createCalendarEvents($RawSheetValues));
        console.log($CalendarEvents);

        OverlayState.set(false);
      } else if (promise.ok === false) {
        console.error(promise.error);

        OverlayText.set(promise.error);
        OverlayType.set('Error');
      }
    } catch (error) {
      console.log(error);

      OverlayText.set(String(error));
      OverlayType.set('Error');
    }
  })();
</script>

<Tailwind />

<main data-theme={$Themes[$ThemeIndex]}>
  <Drawer>
    <NavigationBar>
      <div slot="start">
        {#if $CurrentPage === PageId.Calendar}
          <button class="btn btn-ghost normal-case text-xl">
            {year}年 {month + 1}月
          </button>
        {/if}
      </div>
      <div slot="end">
        {#if $CurrentPage === PageId.Calendar}
          <button class="btn btn-circle" on:click={DisplayedMonth.reset}>
            <MdiCalendarToday />
          </button>
        {/if}
      </div>

      {#if $CurrentPage === PageId.Calendar}
        <Calendar />
      {:else if $CurrentPage === PageId.Dashboard}
        <div class="sm:flex flex-wrap items-start">
          <ClassRegistrationForm />
          <div>
            <StudentCalendarForm />
            <TeacherCalendarForm />
          </div>
        </div>
        <!-- {:else if $CurrentPage === PageId.ManagerDashboard}
        <div /> -->
      {/if}
    </NavigationBar>
  </Drawer>
  <Overlay />
</main>
