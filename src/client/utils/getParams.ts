import dayjs from 'dayjs';

type Location = {
  hash: string;
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
};

export const getLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    try {
      google.script.url.getLocation((location: Location) => {
        resolve(location);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// export const getHash = (): string => {
//   let result: string | undefined;

//   google.script.url.getLocation((location: Location) => {
//     result = location.hash;
//   });

//   const start = dayjs();
//   const end = start.add(5000, 'milliseconds');
//   while (result === undefined) {
//     if (dayjs() >= end) {
//       throw new Error('request time out');
//     }
//   }

//   return result;
// };
