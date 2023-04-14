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
