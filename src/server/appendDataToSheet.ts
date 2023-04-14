const appendDataToSheet = (id: number, ...data: any[]) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().filter((sheet) => sheet.getSheetId() === id)[0];

  const table = sheet.getDataRange().getDisplayValues();
  assert(table[0].length == data[0].length);

  if (id === SHEET_ID_MAIN) {
    const classrooms = ss
      .getSheets()
      .filter((sheet) => sheet.getSheetId() === SHEET_ID_CLASSROOMS)[0]
      .getDataRange()
      .getDisplayValues();

    // reject if duplicated data detected
    // TODO it will be a heavy task
    for (const d of data) {
      assert(
        table
          .filter((arr) => d[1] === arr[1])
          .findIndex((arr) => {
            if (!isTimeOverlapped(arr[2], arr[3], d[2], d[3])) return false;

            const a = classrooms.find((v) => v[0] === d[5])?.slice(2);
            const b = classrooms.find((v) => v[0] === arr[5])?.slice(2);

            assert(a && b);

            // 同じ生徒が授業を受けている
            return new Set([...a, ...b]).size !== [...a, ...b].length;
          }) === -1,
      );
    }
  }

  table.push(...data);

  sheet.getRange(1, 1, table.length, table[0].length).setValues(table);
};
