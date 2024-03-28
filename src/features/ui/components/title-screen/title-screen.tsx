import { useHotkeys } from 'react-hotkeys-hook';

import { useGameState } from '../../../game/hooks/use-game-state';
import { AnimatedText } from '../animated-text';
import { Button } from '../button';
import { Icon } from '../icon';
import { Logo } from '../logo';
import { Screen } from '../screen';
import $$ from './title-screen.module.css';

const handleDiscordClick = () => {
	window.open('https://discord.gg/WzZHEMEV62', '_blank');
};

const handleTwitterClick = () => {
	window.open('https://twitter.com/alexwooods', '_blank');
};

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
				type="button"
				onClick={handleStartClick}
			>
				<Icon name="pad" />
				<AnimatedText>Play</AnimatedText>
			</Button>
			<div className={$$.social}>
				<Button
					type="button"
					onClick={handleDiscordClick}
				>
					<Icon name="discord" />
					<span className={$$.label}>Join Discord</span>
				</Button>
				<Button
					type="button"
					onClick={handleTwitterClick}
				>
					<Icon name="x" />
					<span className={$$.label}>Follow me</span>
				</Button>
			</div>
		</Screen>
	);
};
