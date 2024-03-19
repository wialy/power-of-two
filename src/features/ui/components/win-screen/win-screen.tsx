import { MAX_MOVES_MULTIPLIER } from '../../../game/constants';
import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Screen } from '../screen';
import $$ from './win-screen.module.css';

export const WinScreen = () => {
	const { maxMoves, moves, restart, setScreen } = useGameState();
	const handleExitClick = () => {
		setScreen('levels');
	};

	const handleNextClick = () => {
		setScreen('game');
	};

	const handleRestartClick = () => {
		restart();
		setScreen('game');
	};

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
				<Button onClick={handleExitClick}>Exit</Button>
				<Button onClick={handleRestartClick}>Restart</Button>
				<Button onClick={handleNextClick}>Next</Button>
			</div>
		</Screen>
	);
};
