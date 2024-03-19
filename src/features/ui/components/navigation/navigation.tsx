import { useGameState } from '../../../game/hooks/use-game-state';
import { Button } from '../button';
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
			</ScreenContainer>
		</div>
	</div>
);

const Episodes = () => (
	<Screen id="episodes">
		<div className={$$.bar}>
			<div className={$$.title}>Episodes</div>
			<div className={$$.subtitle}>Please choose the episode</div>
		</div>
	</Screen>
);

const Levels = () => (
	<Screen id="levels">
		<div className={$$.bar}>
			<div className={$$.leftAction}>
				<BackButton label="Episodes" />
			</div>
			<div className={$$.title}>Levels</div>
			<div className={$$.subtitle}>Please choose the level</div>
		</div>
	</Screen>
);

const Game = () => {
	const { maxMoves, moves, restart } = useGameState();

	return (
		<Screen id="game">
			<div className={$$.bar}>
				<div className={$$.leftAction}>
					<BackButton label="Levels" />
				</div>
				<div className={$$.subtitle}>Moves</div>
				<div className={$$.title}>{maxMoves - moves}</div>
				<div className={$$.rightAction}>
					<Button onClick={restart}>⟳&nbsp;Restart</Button>
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

const BackButton = ({ label = 'Back' }: { label?: string }) => {
	const { screen, screens, setScreen } = useGameState();

	const index = screens.indexOf(screen);

	const isVisible = ['levels', 'game'].includes(screen);

	const handleClick = () => {
		setScreen(screens[index - 1]);
	};

	if (!isVisible) {
		return null;
	}

	return <Button onClick={handleClick}>&larr;&nbsp;{label}</Button>;
};
