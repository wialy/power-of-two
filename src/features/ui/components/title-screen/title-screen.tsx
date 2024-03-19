import { useHotkeys } from 'react-hotkeys-hook';

import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Logo } from '../logo';
import { Screen } from '../screen';
import $$ from './title-screen.module.css';

export const TitleScreen = () => {
	const { screen, setScreen } = useGameState();
	const isVisible = screen === 'title';

	const handleStartClick = () => {
		setScreen('episodes');
	};

	useHotkeys('Enter', handleStartClick, {
		enabled: isVisible,
	});

	return (
		<Screen
			className={$$.titleScreen}
			id="title"
		>
			<Logo />
			<Button
				size="large"
				onClick={handleStartClick}
			>
				Play
			</Button>
		</Screen>
	);
};
