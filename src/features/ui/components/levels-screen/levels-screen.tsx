import { LevelsView } from '../levels-view';
import { Screen } from '../screen';
import $$ from './levels-screen.module.css';

export const LevelsScreen = () => (
	<Screen
		className={$$.levelsScreen}
		id="levels"
	>
		<LevelsView />
	</Screen>
);
