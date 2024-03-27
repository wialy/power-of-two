import { GameView } from '../game-view';
import { LevelInfo } from '../level-info';
import { Screen } from '../screen';
import $$ from './game-screen.module.css';

export const GameScreen = () => (
	<Screen
		className={$$.gameScreen}
		id="game"
	>
		<GameView />
		<LevelInfo />
	</Screen>
);
