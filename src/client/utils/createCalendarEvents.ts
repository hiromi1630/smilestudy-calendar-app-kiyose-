import dayjs from 'dayjs';
import type { TimeIndexedCalendarEvents } from '../types';
import { isDateFormat } from '../types';
import { assert } from './assert';

export const createCalendarEvents = (
  data: Sheet,
): TimeIndexedCalendarEvents => {
  const result: TimeIndexedCalendarEvents = {};

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

    const key = dayjs(date).format('YYYY/MM/DD');
    assert(isDateFormat(key), key);

    result[key] = result[key] || [];
    result[key].push({
      id,
      date: dayjs(date),
      timeStart: dayjs(timeStart).format('HH:mm'),
      timeEnd: dayjs(timeEnd).format('HH:mm'),
      teacher: {
        id: teacher[0],
        name: teacher[1],
        familyName: teacher[2],
        givenName: teacher[3],
        color: teacher[4],
        paymentLesson: teacher[5],
        paymentOthers: teacher[6],
      },
      classroom: {
        id: classroom[0],
        name: classroom[1],
        students: students,
      },
      subject: {
        id: subject[0],
        name: subject[1],
        color: subject[2],
      },
      lessonType: {
        id: lessonType[0],
        name: lessonType[1],
      },
      done,
    });
  }

  return result;
};
