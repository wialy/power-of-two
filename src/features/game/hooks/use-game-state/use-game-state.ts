import { create } from 'zustand';

import { GameState } from '../../types';

export const useGameState = create<GameState>((set) => ({
	episode: '',
	level: '',
	setEpisode: (episode) => set({ episode }),
	setLevel: (level) => set({ level }),
}));
