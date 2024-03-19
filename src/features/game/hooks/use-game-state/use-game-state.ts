import { create } from 'zustand';

import { GameState } from '../../types';

export const useGameState = create<GameState>((set, get) => ({
	countMove() {
		set(({ moves }) => ({
			moves: moves + 1,
		}));
	},
	episode: '',
	level: '',
	maxMoves: 0,
	moves: 0,
	restart() {
		const { level } = get();
		set(() => ({
			level: '',
		}));
		setTimeout(() => {
			get().setLevel(level);
		}, 0);
	},
	screen: 'episodes',
	screens: ['episodes', 'levels', 'game'],
	setEpisode: (episode) => set({ episode }),
	setLevel(level) {
		set({ level, moves: 0 });
	},
	setMaxMoves: (maxMoves) => set({ maxMoves }),
	setMoves: (moves) => set({ moves }),
	setScreen: (screen) => set({ screen }),
}));
