import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { MAX_MOVES_MULTIPLIER } from '../../../game/constants';
import { useGameState } from '../../../game/hooks/use-game-state';
import { useResult } from '../../../game/hooks/use-result';
import { AnimatedText } from '../animated-text';
import { Button } from '../button';
import { Icon } from '../icon';
import { useScreen } from '../screen/screen-provider';
import $$ from './win-screen.module.css';

export const WinScreenContent = () => {
	const { episode, level, restart, setLevel, setMaxMoves, setScreen } =
		useGameState();

	const { highscore, lastReward, moves, pro, title } = useResult();

	const { isFullyVisible, isVisible } = useScreen();

	const { isLoading, levels } = useEpisodeLevels({ episode });

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
		const { id, steps } = getParsedLevelRecord(nextLevel);

		setMaxMoves(steps * MAX_MOVES_MULTIPLIER);
		setLevel(id);
		setScreen('game');
	};

	const handleRestartClick = () => {
		restart();
	};

	useHotkeys('ArrowLeft', handleExitClick, { enabled: isFullyVisible });
	useHotkeys('ArrowRight', handleNextClick, { enabled: isFullyVisible });
	useHotkeys('r', handleRestartClick, { enabled: isFullyVisible });

	if (!isVisible) return null;

	return (
		<>
			<h1>
				<AnimatedText>{title}</AnimatedText>
			</h1>
			{lastReward !== 0 && (
				<h2>
					<AnimatedText>{`Reward $${lastReward}`}</AnimatedText>
				</h2>
			)}
			<div className={$$.stats}>
				<div className={$$.stat}>
					<div className={$$.title}>Moves</div>
					<div className={$$.value}>
						<AnimatedText>{`${moves}`}</AnimatedText>
					</div>
				</div>
				<div className={$$.stat}>
					<div className={$$.title}>Best</div>
					<div className={$$.value}>
						<AnimatedText>{highscore ? `${highscore.moves}` : '-'}</AnimatedText>
					</div>
				</div>
				<div className={$$.stat}>
					<div className={$$.title}>Pro</div>
					<div className={$$.value}>
						<AnimatedText>{`${pro}`}</AnimatedText>
					</div>
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
