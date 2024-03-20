import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { MAX_MOVES_MULTIPLIER } from '../../../game/constants';
import { useGameState } from '../../../game/hooks/use-game-state';
import { useHighscores } from '../../../game/hooks/use-highscores';
import { Button } from '../button';
import { Icon } from '../icon';
import { useScreen } from '../screen/screen-provider';
import $$ from './win-screen.module.css';

export const WinScreenContent = () => {
	const { level, maxMoves, moves, restart, setLevel, setScreen } =
		useGameState();

	const { highscores } = useHighscores();
	const { isFullyVisible } = useScreen();

	const { isLoading, levels } = useEpisodeLevels();

	const levelIndex = useMemo(() => {
		if (isLoading) {
			return undefined;
		}

		return levels.findIndex((levelRecord) => {
			const { id } = getParsedLevelRecord(levelRecord);

			return id === level;
		});
	}, [isLoading, level, levels]);

	const handleExitClick = () => {
		setScreen('levels');
	};

	const handleNextClick = () => {
		if (isLoading || levelIndex === undefined) return;

		if (levelIndex === levels.length - 1) {
			setScreen('episodes');

			return;
		}

		const nextLevel = levels[levelIndex + 1];
		const { id } = getParsedLevelRecord(nextLevel);

		setLevel(id);

		setScreen('game');
	};

	const handleRestartClick = () => {
		restart();
	};

	const highscore = highscores.find(({ levelId }) => levelId === level);

	useHotkeys('ArrowLeft', handleExitClick, { enabled: isFullyVisible });
	useHotkeys('ArrowRight', handleNextClick, { enabled: isFullyVisible });
	useHotkeys('r', handleRestartClick, { enabled: isFullyVisible });

	const pro = maxMoves / MAX_MOVES_MULTIPLIER;

	const title = useMemo(() => {
		if (moves === pro) {
			return 'Like a pro!';
		}

		if (highscore && moves === highscore.moves) {
			return 'Personal best!';
		}

		return moves < maxMoves ? 'Great job!' : 'Last Call!';
	}, [moves, pro, highscore, maxMoves]);

	return (
		<>
			<h1>{title}</h1>
			<div className={$$.stats}>
				<div className={$$.stat}>
					<div className={$$.title}>Moves</div>
					<div className={$$.value}>{moves}</div>
				</div>
				<div className={$$.stat}>
					<div className={$$.title}>Best</div>
					<div className={$$.value}>{highscore ? highscore.moves : '-'}</div>
				</div>
				<div className={$$.stat}>
					<div className={$$.title}>Pro</div>
					<div className={$$.value}>{maxMoves / MAX_MOVES_MULTIPLIER}</div>
				</div>
			</div>

			<div className={$$.buttons}>
				<Button onClick={handleExitClick}>
					<Icon name="exit" />
					Exit
				</Button>
				<Button onClick={handleRestartClick}>
					<Icon name="restart" />
					Restart
				</Button>
				<Button onClick={handleNextClick}>
					Next
					<Icon name="arrowRight" />
				</Button>
			</div>
		</>
	);
};
