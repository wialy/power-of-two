import { create } from 'zustand';

import { GameState } from '../../types';

export const useGameState = create<GameState>((set, get) => ({
	countMove() {
		const { maxMoves, moves } = get();
		const newMoves = moves + 1;

		set({ moves: newMoves });

		if (newMoves >= maxMoves) {
			setTimeout(() => {
				get().setScreen('lost');
			}, 500);
		}
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
			get().setScreen('game');
		}, 10);
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
