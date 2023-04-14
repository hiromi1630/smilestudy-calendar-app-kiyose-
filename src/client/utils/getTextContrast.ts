import { assert } from './assert';

export type ColorCode = `#${string}`;
const isColorCode = (s: string): s is ColorCode =>
  /^#[0-F]{6}$/i.exec(s) ? true : false;

const getBrightFromColorCode = (
  colorCode: ColorCode,
  mod = { r: 0.299, g: 0.587, b: 0.114 },
) => {
  const cc = colorCode.slice(1);
  const digit = Math.floor(cc.length / 3);

  if (digit < 1) {
    return false;
  }

  const rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb.push(parseInt(cc.slice(digit * i, digit * (i + 1)), 16));
  }

  mod.r = mod.r || 1;
  mod.g = mod.g || 1;
  mod.b = mod.b || 1;

  const bright = Math.max(rgb[0] * mod.r, rgb[1] * mod.g, rgb[2] * mod.b) / 255;

  return bright > 0.5;
};

export function getTextColor(bgColor: ColorCode): ColorCode {
  assert(isColorCode(bgColor), `unexpected color code ${bgColor}`);

  return getBrightFromColorCode(bgColor) ? '#111111' : '#FEFEFE';
}
