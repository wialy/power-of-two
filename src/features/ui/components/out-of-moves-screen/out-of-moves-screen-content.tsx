import { useHotkeys } from 'react-hotkeys-hook';

import { useGameState } from '../../../game/hooks/use-game-state';
import { AnimatedText } from '../animated-text';
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
			<h1>
				<AnimatedText>Out Of Moves</AnimatedText>
			</h1>
			<div className={$$.buttons}>
				<Button onClick={handleExitClick}>
					<Icon name="exit" />
				</Button>
				<Button onClick={handleRestartClick}>
					<Icon name="restart" />
					Restart level
				</Button>
			</div>
		</>
	);
};
