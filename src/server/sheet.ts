const SheetNames = [
  'main',
  'students',
  'teachers',
  'classrooms',
  'lessonTypes',
  'timePresets',
  'subjects',
  'grades',
] as const;

type SheetName = typeof SheetNames[number];

type Sheet = {
  [key in SheetName]: any[][];
};

const isSheetName = (v: string): v is SheetName =>
  SheetNames.includes(v as SheetName);

const SheetColumnIndex = {
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
    color: 2,
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
};
