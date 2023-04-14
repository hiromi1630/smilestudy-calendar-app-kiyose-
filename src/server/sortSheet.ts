function sortSheet(id: number, sortSpecObj: number | Object) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().filter((sheet) => sheet.getSheetId() === id)[0];

  const rowCount = sheet.getLastRow();
  const colCount = sheet.getLastColumn();
  sheet.getRange(2, 1, rowCount, colCount).sort(sortSpecObj);
}
