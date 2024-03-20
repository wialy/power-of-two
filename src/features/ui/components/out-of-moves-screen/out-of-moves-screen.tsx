import { useHotkeys } from 'react-hotkeys-hook';

import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Icon } from '../icon';
import { Screen } from '../screen';
import $$ from './out-of-moves-screen.module.css';

export const OutOfMovesScreen = () => {
	const { restart, screen, setScreen } = useGameState();

	const isVisible = screen === 'lost';

	const handleExitClick = () => {
		setScreen('levels');
	};

	const handleRestartClick = () => {
		restart();
		setScreen('game');
	};

	useHotkeys('ArrowLeft', handleExitClick, { enabled: isVisible });
	useHotkeys('ArrowRight', handleRestartClick, { enabled: isVisible });

	return (
		<Screen
			className={$$.outOfMovesScreen}
			id="lost"
		>
			<h1>Out Of Moves</h1>
			<div className={$$.buttons}>
				<Button onClick={handleExitClick}>
					<Icon name="exit" /> Exit
				</Button>
				<Button onClick={handleRestartClick}>
					<Icon name="restart" />
					Restart
				</Button>
			</div>
		</Screen>
	);
};
