import { Screen } from '../screen';
import $$ from './unsolvable-screen.module.css';
import { UnsolvableScreenContent } from './unsolvable-screen-content';

export const UnsolvableScreen = () => (
	<Screen
		className={$$.unsolvableScreen}
		id="unsolvable"
	>
		<UnsolvableScreenContent />
	</Screen>
);
