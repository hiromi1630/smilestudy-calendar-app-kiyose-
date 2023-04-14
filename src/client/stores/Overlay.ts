import { writable } from 'svelte/store';

type OverlayType =
  | 'Info'
  | 'Success'
  | 'Warning'
  | 'Error'
  | 'Alert'
  | 'Loading';

export const OverlayState = writable(true);
export const OverlayType = writable<OverlayType>('Loading');

export const OverlayText = writable('Success!');
