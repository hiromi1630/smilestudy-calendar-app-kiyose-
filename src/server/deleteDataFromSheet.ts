const deleteDataFromSheetById = (sheetId: number, id: string): boolean => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().find((sheet) => sheet.getSheetId() === sheetId);

  assert(sheet, '該当するシートが存在しません。:' + sheetId);

  const row = sheet
    .getDataRange()
    .getDisplayValues()
    .findIndex((row) => row[0] === id);

  assert(row != -1, `id '${id}' was not found`);

  sheet.deleteRow(row + 1);

  return true;
};
