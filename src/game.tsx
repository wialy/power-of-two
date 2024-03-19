import './global.css';

import { useGameState } from './features/game/hooks/use-game-state';
import { EpisodesView } from './features/ui/components/episodes-view';
import { GameView } from './features/ui/components/game-view';
import { LevelsView } from './features/ui/components/levels-view';

const Game = () => {
	const { episode, level } = useGameState();

	if (!episode) {
		return <EpisodesView />;
	}

	if (!level) {
		return <LevelsView />;
	}

	return <>{Boolean(level) && <GameView />}</>;
};

export default Game;
