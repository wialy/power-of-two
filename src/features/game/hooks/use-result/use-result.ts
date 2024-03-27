import { useMemo } from 'react';

import { MAX_MOVES_MULTIPLIER } from '../../constants';
import { useCoins } from '../use-coins';
import { useGameState } from '../use-game-state';
import { useHighscores } from '../use-highscores';

export const useResult = () => {
	const { level, maxMoves, moves } = useGameState();

	const { lastReward } = useCoins();

	const { highscores } = useHighscores();

	const highscore = highscores.find(({ levelId }) => levelId === level);

	const pro = maxMoves / MAX_MOVES_MULTIPLIER;

	const title = useMemo(() => {
		if (moves === pro) {
			return 'Like a pro!';
		}

		if (highscore && moves === highscore.moves) {
			return 'Personal Best!';
		}

		return moves < maxMoves ? 'Great job!' : 'Last Call!';
	}, [moves, pro, highscore, maxMoves]);

	return {
		highscore,
		isPro: moves === pro,
		lastReward,
		moves,
		pro,
		title,
	};
};
