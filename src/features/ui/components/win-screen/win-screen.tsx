import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { MAX_MOVES_MULTIPLIER } from '../../../game/constants';
import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Screen } from '../screen';
import $$ from './win-screen.module.css';

export const WinScreen = () => {
	const { level, maxMoves, moves, restart, screen, setLevel, setScreen } =
		useGameState();
	const isVisible = screen === 'won';

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

	useHotkeys('ArrowLeft', handleExitClick, { enabled: isVisible });
	useHotkeys('ArrowRight', handleNextClick, { enabled: isVisible });
	useHotkeys('r', handleRestartClick, { enabled: isVisible });

	return (
		<Screen
			className={$$.winScreen}
			id="won"
		>
			<h1>Level Complete!</h1>
			<div className={$$.stats}>
				<div className={$$.stat}>
					<div className={$$.title}>Moves</div>
					<div className={$$.value}>{moves}</div>
				</div>
				<div className={$$.stat}>
					<div className={$$.title}>Pro</div>
					<div className={$$.value}>{maxMoves / MAX_MOVES_MULTIPLIER}</div>
				</div>
			</div>

			<div className={$$.buttons}>
				<Button onClick={handleExitClick}>&larr;&nbsp;Exit</Button>
				<Button onClick={handleRestartClick}>↻&nbsp;Restart</Button>
				<Button onClick={handleNextClick}>Next&nbsp;&rarr;</Button>
			</div>
		</Screen>
	);
};
