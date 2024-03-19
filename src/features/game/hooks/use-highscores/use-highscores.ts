import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Highscore } from '../../types';

export const useHighscores = create(
	persist<{
		highscores: Highscore[];
		save: (highscore: Highscore) => void;
	}>(
		(set, get) => ({
			highscores: [],
			save(highscore) {
				const { highscores } = get();

				const index = highscores.findIndex(
					({ levelId }) => levelId === highscore.levelId,
				);

				if (index === -1) {
					set({ highscores: [...highscores, highscore] });
				} else if (highscores[index].moves > highscore.moves) {
					set({
						highscores: [
							...highscores.slice(0, index),
							highscore,
							...highscores.slice(index + 1),
						],
					});
				}
			},
		}),
		{
			name: 'highscores',
		},
	),
);
