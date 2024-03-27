import './global.css';

import { useEffect } from 'react';

import { useGameState } from './features/game/hooks/use-game-state';
import { Music, useSound } from './features/game/hooks/use-sound';
import { ScreenId } from './features/game/types';
import { EpisodesScreen } from './features/ui/components/episodes-screen';
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

const MUSIC_MAP: Record<Music, ScreenId[]> = {
	game: ['game'],
	loose: ['lost', 'unsolvable'],
	menu: ['title', 'episodes', 'levels'],
};

const Game = () => {
	const { screen } = useGameState();
	const { setMusic } = useSound();

	useEffect(() => {
		const music = Object.keys(MUSIC_MAP).find((key) =>
			MUSIC_MAP[key as Music].includes(screen),
		) as Music | undefined;

		setMusic(music);
	}, [screen, setMusic]);

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
		</Layout>
	);
};

export default Game;
