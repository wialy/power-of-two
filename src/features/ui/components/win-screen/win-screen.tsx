import { Screen } from '../screen';
import $$ from './win-screen.module.css';
import { WinScreenContent } from './win-screen-content';

export const WinScreen = () => (
	<Screen
		className={$$.winScreen}
		id="won"
	>
		<WinScreenContent />
	</Screen>
);
