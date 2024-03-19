import './global.css';

import { EpisodesView } from './features/ui/components/episodes-view';
import { GameView } from './features/ui/components/game-view';
import { Layout } from './features/ui/components/layout';
import { LevelsView } from './features/ui/components/levels-view';
import { Screen } from './features/ui/components/screen';
import { ScreenContainer } from './features/ui/components/screen-container';

const Game = () => (
	<Layout>
		<ScreenContainer>
			<Screen id="episodes">
				<EpisodesView />
			</Screen>
			<Screen id="levels">
				<LevelsView />
			</Screen>
			<Screen id="game">
				<GameView />
			</Screen>
		</ScreenContainer>
	</Layout>
);

export default Game;
