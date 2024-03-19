import { EpisodesView } from '../episodes-view';
import { Screen } from '../screen';
import $$ from './episodes-screen.module.css';

export const EpisodesScreen = () => (
	<Screen
		className={$$.episodesScreen}
		id="episodes"
	>
		<EpisodesView />
	</Screen>
);
