// ! オブジェクト型を返そうとすると undefined や null に
// ! なってしまう（なんで？）ので、string 型にして返す

// type APIResult<T> =
type APIResult =
  | {
      ok: true;
      json: string;
      // data: T;
    }
  | {
      ok: false;
      error: Error;
    };

// const ErrorHandler = <T>(process: () => T): APIResult<T> => {
const ErrorHandler = (process: () => any): APIResult => {
  try {
    const result = process();
    console.log(result);
    return {
      ok: true,
      json: JSON.stringify(result),
      // data: process(),
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: new Error(String(error)),
    };
  }
};

export const LoadDataFromSheet = (header: boolean): APIResult =>
  ErrorHandler(() => loadDataFromSheet(header));

export const DeleteEventById = (id: string): APIResult =>
  ErrorHandler(() => deleteDataFromSheetById(SHEET_ID_MAIN, id));

export const AddEvents = (events: any[][]): APIResult =>
  ErrorHandler(() => {
    appendDataToSheet(SHEET_ID_MAIN, ...events);
    sortSheet(SHEET_ID_MAIN, [3, 2]);
  });

export const GetScriptProperties = (): APIResult =>
  ErrorHandler(getScriptProperties);
