import type { Dayjs } from 'dayjs';

type Teacher = {
  id: string;
  name: string;
  familyName: string;
  givenName: string;
  color: string;
  paymentLesson: number;
  paymentOthers: number;
};

type Student = {
  id: string;
  name: string;
  offsetYear: string;
  comiruId: string;
};

type Classroom = {
  id: string;
  name: string;
  students: Student[];
};

type Subject = {
  id: string;
  name: string;
  color: string;
};

type LessonType = {
  id: string;
  name: string;
};

export type CalendarEvent = {
  id: string;
  date: Dayjs;
  timeStart: string;
  timeEnd: string;
  teacher: Teacher;
  classroom: Classroom;
  subject: Subject;
  lessonType: LessonType;
  done: boolean;
};

export type LessonNum = {
  [key: string]: any;
};

export type DateFormat = `${string}/${string}/${string}`;
export const isDateFormat = (v: string): v is DateFormat =>
  v.match(/^[0-9]{4}\/(1[0-2]|0?[1-9])\/([12][0-9]|3[01]|0?[1-9])?$/) !== null;

export type TimeIndexedCalendarEvents = {
  [key: DateFormat]: CalendarEvent[];
};
