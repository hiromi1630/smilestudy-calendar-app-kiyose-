import { Random } from '../class/Random';
import type { ColorCode } from './getTextContrast';

export const getFixedColorFromString = (subject: string): ColorCode => {
  const str = Array.from(subject).reduce((acc, v) => acc + v.charCodeAt(0), '');
  const code = new Random(parseInt(str)).nextInt(0, 0x1000000);
  return `#${('000000' + code.toString(16)).slice(-6)}`;
};
