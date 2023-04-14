const convertTimeStringToNumber = (str: string): number => {
  const [hh, mm, ss] = str.split(':');
  return Number(hh) * 3600 + Number(mm) * 60 + (ss ? Number(ss) : 0);
};

const isTimeOverlapped = (
  start1: string,
  end1: string,
  start2: string,
  end2: string,
): boolean => {
  const s1 = convertTimeStringToNumber(start1);
  const s2 = convertTimeStringToNumber(start2);

  if (s1 > s2) return s1 < convertTimeStringToNumber(end2);
  else return s2 < convertTimeStringToNumber(end1);
};
