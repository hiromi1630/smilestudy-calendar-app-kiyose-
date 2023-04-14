const loadDataFromSheet = (header: boolean): Sheet => {
  const Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const result: Sheet = {
    main: [],
    students: [],
    teachers: [],
    classrooms: [],
    lessonTypes: [],
    timePresets: [],
    subjects: [],
    grades: [],
  };

  for (const Sheet of Spreadsheet.getSheets()) {
    const sheetName = Sheet.getSheetName();
    if (isSheetName(sheetName)) {
      result[sheetName] = Sheet.getDataRange()
        .getValues()
        .slice(header ? 0 : 1);
    }
  }

  return result;
};
