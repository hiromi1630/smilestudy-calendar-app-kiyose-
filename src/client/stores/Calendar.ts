import { Writable, readable, writable } from 'svelte/store';
import type { TimeIndexedCalendarEvents } from '../types';
import dayjs, { Dayjs } from 'dayjs';

function createDisplayedMonth() {
  const { subscribe, set, update } = writable(dayjs());

  return {
    subscribe: subscribe,
    year: (year: number) => update((v) => v.year(year)),
    month: (month: number) => update((v) => v.month(month)),
    next: () => update((v) => v.add(1, 'month')),
    prev: () => update((v) => v.subtract(1, 'month')),
    reset: () => set(dayjs()),
  };
}

export const DisplayedMonth = createDisplayedMonth();

export const SheetColumnIndex = readable({
  main: {
    id: 0,
    date: 1,
    timeStart: 2,
    timeEnd: 3,
    teacher: 4,
    classroom: 5,
    subject: 6,
    lessonType: 7,
    done: 8,
  },
  teachers: {
    id: 0,
    name: 1,
    familyName: 2,
    givenName: 3,
    color: 4,
    paymentLesson: 5,
    paymentOthers: 6,
  },
  students: {
    id: 0,
    name: 1,
    offsetYear: 2,
    comiruId: 3,
  },
  classrooms: {
    id: 0,
    name: 1,
    students: 2,
  },
  subjects: {
    id: 0,
    name: 1,
  },
  lessonTypes: {
    id: 0,
    name: 1,
  },
  grades: {
    id: 0,
    name: 1,
  },
  timePresets: {
    start: 0,
    end: 1,
  },
});

export const SelectedDate: Writable<Dayjs> = writable(dayjs());
export const RawSheetValues: Writable<Sheet> = writable({
  main: [],
  students: [],
  teachers: [],
  classrooms: [],
  lessonTypes: [],
  timePresets: [],
  subjects: [],
  grades: [],
});
export const CalendarEvents: Writable<TimeIndexedCalendarEvents> = writable({});

export const WEEKDAYS = readable({
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
});

export const EventButtonType = writable<'Subject' | 'Default'>('Default');
