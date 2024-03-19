import { create } from 'zustand';

import { GameState } from '../../types';

export const useGameState = create<GameState>((set) => ({
	episode: '',
	level: '',
	screen: 'episodes',
	screens: ['episodes', 'levels', 'game'],
	setEpisode: (episode) => set({ episode }),
	setLevel: (level) => set({ level }),
	setScreen: (screen) => set({ screen }),
}));
