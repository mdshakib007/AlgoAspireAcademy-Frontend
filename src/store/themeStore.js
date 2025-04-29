import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: true,
      toggle: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'theme' }
  )
);