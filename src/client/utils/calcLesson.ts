import dayjs from 'dayjs';
import type { LessonNum } from '../types';
import { assert } from './assert';

export const calcLessons = (data: Sheet, year: any, month: any): LessonNum => {
  const result: LessonNum = {};

  const contentsMain = data.main;
  const contentsTeacher = data.teachers;
  const contentsStudent = data.students;
  const contentsClassroom = data.classrooms;
  const contentsSubject = data.subjects;
  const contentsLessonType = data.lessonTypes;

  for (const [
    id,
    date,
    timeStart,
    timeEnd,
    idTeacher,
    idClassroom,
    idSubject,
    idLessonType,
    done,
  ] of contentsMain) {
    const teacher = contentsTeacher.find((v) => v[0] === idTeacher);
    const classroom = contentsClassroom.find((v) => v[0] === idClassroom);
    const subject = contentsSubject.find((v) => v[0] === idSubject);
    const lessonType = contentsLessonType.find((v) => v[0] === idLessonType);

    assert(teacher, `There's no contents of teacher. id: ${idTeacher}`);
    assert(classroom, `There's no contents of classroom. id: ${idTeacher}`);
    assert(subject, `There's no contents of subject. id: ${idTeacher}`);
    assert(lessonType, `There's no contents of lessonType. id: ${idTeacher}`);

    const students = classroom?.slice(2).map((id) => {
      const student = contentsStudent.find((student) => student[0] === id);

      assert(student, `There's no contents of student. id: ${id}`);

      return {
        id: student[0],
        name: student[1],
        offsetYear: student[2],
        comiruId: student[3],
      };
    });

    assert(students, `There's no contents of students.`);

    if (dayjs(date).month() == month && dayjs(date).year() == year) {
      const key = lessonType[1];
      if (key in result == false) {
        result[key] = 0;
      }
      result[key]++;
    }
  }

  return result;
};
