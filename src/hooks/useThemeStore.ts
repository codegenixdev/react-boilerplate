import { create } from 'zustand';

import { ThemeMode } from '@/types/themeMode';

type Store = {
	mode: 'system' | 'dark' | 'light';
	setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<Store>((set) => ({
	mode: 'system',
	setMode: (mode) => set(() => ({ mode })),
}));
