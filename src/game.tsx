import './global.css';

import { EpisodesScreen } from './features/ui/components/episodes-screen';
import { GameScreen } from './features/ui/components/game-screen';
import { Layout } from './features/ui/components/layout';
import { LevelsScreen } from './features/ui/components/levels-screen';
import { Navigation } from './features/ui/components/navigation';
import { OutOfMovesScreen } from './features/ui/components/out-of-moves-screen';
import { ScreenContainer } from './features/ui/components/screen-container';
import { TitleScreen } from './features/ui/components/title-screen';
import { UnsolvableScreen } from './features/ui/components/unsolvable-screen';
import { WinScreen } from './features/ui/components/win-screen';

const Game = () => (
	<Layout navigation={<Navigation />}>
		<ScreenContainer>
			<TitleScreen />
			<EpisodesScreen />
			<LevelsScreen />
			<GameScreen />
			<OutOfMovesScreen />
			<UnsolvableScreen />
			<WinScreen />
		</ScreenContainer>
	</Layout>
);

export default Game;
