import { writable, readable } from 'svelte/store';

const themes = ['light', 'dark'];
export const Themes = readable(themes);
export const ThemeCount = readable(themes.length);

export const ThemeIndex = writable(0);
