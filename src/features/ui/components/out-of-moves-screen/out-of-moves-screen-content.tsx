import { useHotkeys } from 'react-hotkeys-hook';

import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Icon } from '../icon';
import { useScreen } from '../screen/screen-provider';
import $$ from './out-of-moves-screen.module.css';

export const OutOfMovesScreenContent = () => {
	const { isFullyVisible } = useScreen();

	const { restart, setScreen } = useGameState();

	const handleExitClick = () => {
		setScreen('levels');
	};

	const handleRestartClick = () => {
		restart();
		setScreen('game');
	};

	useHotkeys('ArrowLeft', handleExitClick, { enabled: isFullyVisible });
	useHotkeys('ArrowRight', handleRestartClick, { enabled: isFullyVisible });

	return (
		<>
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
		</>
	);
};
