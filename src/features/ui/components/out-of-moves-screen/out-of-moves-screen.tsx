import { Screen } from '../screen';
import $$ from './out-of-moves-screen.module.css';
import { OutOfMovesScreenContent } from './out-of-moves-screen-content';

export const OutOfMovesScreen = () => (
	<Screen
		className={$$.outOfMovesScreen}
		id="lost"
	>
		<OutOfMovesScreenContent />
	</Screen>
);
