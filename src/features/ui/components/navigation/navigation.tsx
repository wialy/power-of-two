import { useHotkeys } from 'react-hotkeys-hook';

import { useEpisodes } from '../../../editor/hooks/use-episodes';
import { useCoins } from '../../../game/hooks/use-coins';
import { useGameState } from '../../../game/hooks/use-game-state';
import { AnimatedText } from '../animated-text';
import { Button } from '../button';
import { Icon } from '../icon';
import { Screen } from '../screen';
import { ScreenContainer } from '../screen-container';
import $$ from './navigation.module.css';

export const Navigation = () => (
	<div className={$$.navigation}>
		<div className={$$.content}>
			<ScreenContainer>
				<Episodes />
				<Levels />
				<Game />
				<OutOfMoves />
				<Win />
			</ScreenContainer>
		</div>
	</div>
);

const Episodes = () => (
	<Screen id="episodes">
		<div className={$$.bar}>
			<div className={$$.leftAction}>
				<BackButton label="Back" />
			</div>
			<div className={$$.title}>
				<AnimatedText>Episodes</AnimatedText>
			</div>
			<div className={$$.subtitle}>
				<AnimatedText>Choose an episode</AnimatedText>
			</div>
		</div>
	</Screen>
);

const Levels = () => {
	const { episodes } = useEpisodes();
	const { episode } = useGameState();

	const currentEpisode = episodes.find((record) => record.symbols === episode);

	return (
		<Screen id="levels">
			<div className={$$.bar}>
				<div className={$$.leftAction}>
					<BackButton label="Episodes" />
				</div>
				<div className={$$.title}>
					<AnimatedText>{currentEpisode?.name ?? ''}</AnimatedText>
				</div>
				<div className={$$.subtitle}>
					<AnimatedText>Choose a level</AnimatedText>
				</div>
			</div>
		</Screen>
	);
};

const Game = () => {
	const { maxMoves, moves, restart, screen } = useGameState();
	const { coins } = useCoins();

	const isVisible = screen === 'game';

	useHotkeys('r', restart, { enabled: isVisible });

	return (
		<Screen id="game">
			<div className={$$.bar}>
				<div className={$$.leftAction}>
					<BackButton label="Levels" />
				</div>
				<div className={$$.row}>
					<div className={$$.column}>
						<div className={$$.subtitle}>Moves</div>
						<div className={$$.title}>{maxMoves - moves}</div>
					</div>
					<div className={$$.column}>
						<div className={$$.subtitle}>Coins</div>
						<div className={$$.title}>${coins}</div>
					</div>
				</div>
				<div className={$$.rightAction}>
					<Button onClick={restart}>
						<Icon name="restart" />
						<span className={$$.buttonText}>Restart</span>
					</Button>
				</div>
			</div>
		</Screen>
	);
};

const OutOfMoves = () => (
	<Screen id="lost">
		<div className={$$.bar}>
			<div className={$$.title}>Game Over</div>
		</div>
	</Screen>
);

const Win = () => (
	<Screen id="won">
		<div className={$$.bar}>
			<div className={$$.title}>Level Complete!</div>
		</div>
	</Screen>
);

const BackButton = ({ label = 'Back' }: { label?: string }) => {
	const { screen, screens, setScreen } = useGameState();

	const index = screens.indexOf(screen);

	const handleClick = () => {
		setScreen(screens[index - 1]);
	};

	return (
		<Button onClick={handleClick}>
			<Icon name="arrowLeft" />
			<span className={$$.buttonText}>{label}</span>
		</Button>
	);
};
