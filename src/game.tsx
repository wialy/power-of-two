import './global.css';

import { SoundToggle } from './features/sound/components/sound-toggle';
import { useSounds } from './features/sound/hooks/use-sounds';
import { EpisodesScreen } from './features/ui/components/episodes-screen';
import { FullscreenToggle } from './features/ui/components/fullscreen-toggle';
import { GameScreen } from './features/ui/components/game-screen';
import { Layout } from './features/ui/components/layout';
import { LevelInfo } from './features/ui/components/level-info';
import { LevelsScreen } from './features/ui/components/levels-screen';
import { Navigation } from './features/ui/components/navigation';
import { OutOfMovesScreen } from './features/ui/components/out-of-moves-screen';
import { ScreenContainer } from './features/ui/components/screen-container';
import { TitleScreen } from './features/ui/components/title-screen';
import { UnsolvableScreen } from './features/ui/components/unsolvable-screen';
import { WinScreen } from './features/ui/components/win-screen';

const Game = () => {
	useSounds();

	return (
		<Layout navigation={<Navigation />}>
			<ScreenContainer>
				<TitleScreen />
				<EpisodesScreen />
				<LevelsScreen />
				<GameScreen />
				<OutOfMovesScreen />
				<UnsolvableScreen />
				<WinScreen />
				<LevelInfo />
			</ScreenContainer>
			<SoundToggle />
			<FullscreenToggle />
		</Layout>
	);
};

export default Game;
