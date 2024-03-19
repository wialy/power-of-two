import { GameView } from '../game-view';
import { Screen } from '../screen';
import $$ from './game-screen.module.css';

export const GameScreen = () => (
	<Screen
		className={$$.gameScreen}
		id="game"
	>
		<GameView />
	</Screen>
);
