import { create } from 'zustand';

import { GameState } from '../../types';

export const useGameState = create<GameState>((set, get) => ({
	countMove() {
		const { maxMoves, moves } = get();
		const newMoves = moves + 1;

		set({ moves: newMoves });

		if (newMoves >= maxMoves) {
			get().setPhase('lost');
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
		}, 0);
	},
	screen: 'episodes',
	screens: ['episodes', 'levels', 'game', 'lost'],
	setEpisode: (episode) => set({ episode }),
	setLevel(level) {
		set({ level, moves: 0 });
	},
	setMaxMoves: (maxMoves) => set({ maxMoves }),
	setMoves: (moves) => set({ moves }),
	setPhase: (phase) => set({ phase }),
	setScreen: (screen) => set({ screen }),
}));
