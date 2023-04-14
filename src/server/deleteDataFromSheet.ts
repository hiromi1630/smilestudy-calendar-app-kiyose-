const deleteDataFromSheetById = (sheet_id: number, id: string): boolean => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss
    .getSheets()
    .filter((sheet) => sheet.getSheetId() === sheet_id)[0];

  const row = sheet
    .getDataRange()
    .getDisplayValues()
    .findIndex((row) => row[0] === id);

  assert(row != -1, `not found id: ${id}`);

  sheet.deleteRow(row + 1);

  return true;
};
