<script lang="ts">
  import ChevronLeft from './Button/ChevronLeft.svelte';
  import ChevronRight from './Button/ChevronRight.svelte';
  import Header from './Header.svelte';
  import Cells from './Cells.svelte';
  import { DisplayedMonth, SelectedDate } from './stores';
  import dayjs from 'dayjs';

  let selectedYear = dayjs().year();
  let selectedMonth = dayjs().month();

  DisplayedMonth.subscribe((v) => {
    selectedYear = v.year();
    selectedMonth = v.month();
  });

  const modalId =
    new Date().getTime().toString(16) +
    Math.floor(100 * Math.random()).toString(16);
</script>

<label for={modalId} class="btn">open modal</label>

<input type="checkbox" id={modalId} class="modal-toggle" />
<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
  <label class="modal-box relative" for="">
    <div class="lg:flex flex-row">
      <div class="navbar">
        <div class="navbar-start">
          <div class="btn btn-ghost">
            {selectedYear}年 {selectedMonth + 1}月
          </div>
        </div>
        <div class="navbar-end">
          <ChevronLeft />
          <ChevronRight />
        </div>
      </div>
      <div class="grid grid-cols-7 m-3">
        <Header />
        <Cells />
      </div>
    </div>
  </label>
</label>
