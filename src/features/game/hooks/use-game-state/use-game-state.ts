import { create } from 'zustand';

import { GameState } from '../../types';

export const useGameState = create<GameState>((set, get) => ({
	countMove() {
		const { maxMoves, moves } = get();
		const newMoves = moves + 1;

		set({ moves: newMoves });

		if (newMoves >= maxMoves) {
			get().setScreen('lost');
		}
	},
	episode: '',
	level: '',
	maxMoves: 0,
	moves: 0,
	phase: 'playing',
	restart() {
		const { level } = get();
		set(() => ({
			level: '',
		}));
		setTimeout(() => {
			get().setLevel(level);
			get().setScreen('game');
		}, 0);
	},
	screen: 'title',
	screens: ['title', 'episodes', 'levels', 'game', 'lost', 'won'],
	setEpisode: (episode) => set({ episode }),
	setLevel(level) {
		set({ level, moves: 0 });
	},
	setMaxMoves: (maxMoves) => set({ maxMoves }),
	setMoves: (moves) => set({ moves }),
	setScreen: (screen) => set({ screen }),
}));
