import dayjs from 'dayjs';
import { writable } from 'svelte/store';

export const DisplayedMonth = (() => {
  const { subscribe, update, set } = writable(dayjs());

  return {
    subscribe,
    next: () => update((v) => v.add(1, 'month')),
    prev: () => update((v) => v.subtract(1, 'month')),
    reset: () => set(dayjs()),
  };
})();

export const SelectedDate = writable(dayjs());
