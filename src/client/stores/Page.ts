import { readable, writable } from 'svelte/store';

export const PageId = {
  Calendar: 0,
  Dashboard: 1,
  // ManagerDashboard: 2,
} as const;

export const Pages = readable([
  {
    id: PageId.Calendar,
    name: 'カレンダー',
  },
  {
    id: PageId.Dashboard,
    name: 'ダッシュボード',
  },
  // {
  //   id: PageId.ManagerDashboard,
  //   name: '管理者用ダッシュボード',
  // },
]);
export const CurrentPage = writable<number>(PageId.Calendar);
