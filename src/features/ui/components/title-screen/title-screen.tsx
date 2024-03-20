import { useHotkeys } from 'react-hotkeys-hook';

import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
import { Icon } from '../icon';
import { Logo } from '../logo';
import { Screen } from '../screen';
import $$ from './title-screen.module.css';

const handleDiscordClick = () => {
	window.open('https://discord.gg/DTBaDADspt', '_blank');
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
				Play
			</Button>
			<div className={$$.social}>
				<Button
					type="button"
					onClick={handleDiscordClick}
				>
					<Icon name="discord" />
					Join Discord
				</Button>
				<Button
					type="button"
					onClick={handleTwitterClick}
				>
					<Icon name="x" />
					Follow me
				</Button>
			</div>
		</Screen>
	);
};
