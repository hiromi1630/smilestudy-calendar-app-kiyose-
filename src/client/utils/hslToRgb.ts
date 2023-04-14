export const HSLToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return (
    '#' +
    Math.floor(255 * f(0))
      .toString(16)
      .padStart(2, '0') +
    Math.floor(255 * f(8))
      .toString(16)
      .padStart(2, '0') +
    Math.floor(255 * f(4))
      .toString(16)
      .padStart(2, '0')
  );
};

export const stringToNumber = (str: string): number =>
  parseInt(Array.from(str).reduce((acc, v) => acc + v.charCodeAt(0), ''));
