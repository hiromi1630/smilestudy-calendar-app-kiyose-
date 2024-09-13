const appendDataToSheet = (id: number, ...data: any[]): boolean => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().filter((sheet) => sheet.getSheetId() === id)[0];

  const table = sheet.getDataRange().getDisplayValues().slice(1);
  assert(
    table[0].length == data[0].length,
    'データの形式が元データと合いません。',
  );
  assert(
    data.every((v) => v.length === data[0].length),
    'データの形式が不正です。',
  );

  if (id === SHEET_ID_MAIN) {
    const classrooms = ss
      .getSheets()
      .filter((sheet) => sheet.getSheetId() === SHEET_ID_CLASSROOMS)[0]
      .getDataRange()
      .getDisplayValues();

    const teachers = ss
      .getSheets()
      .filter((sheet) => sheet.getSheetId() === SHEET_ID_TEACHERS)[0]
      .getDataRange()
      .getDisplayValues();

    const idxDate = SheetColumnIndex.main.date;
    const idxTimeStart = SheetColumnIndex.main.timeStart;
    const idxTimeEnd = SheetColumnIndex.main.timeEnd;
    const idxClassroom = SheetColumnIndex.main.classroom;
    const idxTeachers = SheetColumnIndex.main.teacher;

    // 入力の各データに関して、授業時間が重複しているものがあれば
    // 反映させずにエラーを吐く
    // TODO it will be a heavy task
    for (const d of data) {
      for (const event of table.filter((arr) => d[idxDate] === arr[idxDate])) {
        if (
          !isTimeOverlapped(
            event[idxTimeStart],
            event[idxTimeEnd],
            d[idxTimeStart],
            d[idxTimeEnd],
          )
        )
          continue;

        // 集団授業データの中から、生徒個人を抽出する
        const a = classrooms.find((v) => v[0] === d[idxClassroom])?.slice(2);
        const b = classrooms
          .find((v) => v[0] === event[idxClassroom])
          ?.slice(2);

        assert(
          a && b,
          '入力データに含まれる生徒のデータが存在しない可能性があります。',
        );

        const teacher = teachers
          .find((v) => v[0] === d[idxTeachers])
          ?.slice(0, 1);
        const teacher_event = teachers
          .find((v) => v[0] === event[idxTeachers])
          ?.slice(0, 1);
        teacher.push(...teacher_event);
        const teacher_duplicated = teacher.some(
          (x) => teacher.indexOf(x) !== teacher.lastIndexOf(x),
        );

        a.push(...b);
        const duplicated = a.some((x) => a.indexOf(x) !== a.lastIndexOf(x));
        console.log(a, new Array(new Set(a)));
        console.log(duplicated);

        // 同じ生徒が同じ時間に授業を受けている
        assert(
          !duplicated,
          `授業時間が重複している可能性があります。
          (${d[idxDate]} ${d[idxTimeStart]})`,
        );

        assert(
          !teacher_duplicated,
          `授業時間が重複している可能性があります。
          (${d[idxDate]} ${d[idxTimeStart]})`,
        );
      }

      table.push(d);
    }
  }

  sheet.getRange(2, 1, table.length, table[0].length).setValues(table);
  return true;
};
