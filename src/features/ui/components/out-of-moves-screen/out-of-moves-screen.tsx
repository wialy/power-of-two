import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Screen } from '../screen';
import $$ from './out-of-moves-screen.module.css';

export const OutOfMovesScreen = () => {
	const { restart, setScreen } = useGameState();

	const handleExitClick = () => {
		setScreen('levels');
	};

	const handleRestartClick = () => {
		restart();
		setScreen('game');
	};

	return (
		<Screen
			className={$$.outOfMovesScreen}
			id="lost"
		>
			<h1>Out Of Moves</h1>
			<div className={$$.buttons}>
				<Button onClick={handleExitClick}>Exit</Button>
				<Button onClick={handleRestartClick}>Restart</Button>
			</div>
		</Screen>
	);
};
