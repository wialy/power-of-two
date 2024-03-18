import './global.css';

import { useEpisodes } from './features/editor/hooks/use-episodes';
import { VECTOR_LEFT } from './features/engine/constants';
import { Entity } from './features/engine/types/entities';
import { createEntity } from './features/engine/utils/create-entity';
import { useControls } from './features/game/hooks/use-controls';
import { useGame } from './features/game/hooks/use-game';
import { BoardView } from './features/ui/components/board-view';
import { SwipeArea } from './features/ui/components/swipe-area';

const level: Entity[] = [
	createEntity('floor', { position: { x: 2, y: 0 } }),
	createEntity('floor', { position: { x: 2, y: 1 } }),
	createEntity('floor', { position: { x: 1, y: 0 } }),
	createEntity('floor', { position: { x: 1, y: 1 } }),
	createEntity('floor', { direction: VECTOR_LEFT, position: { x: 2, y: 2 } }),
	createEntity('floor', { position: { x: 1, y: 2 } }),
	createEntity('floor', { position: { x: 0, y: 2 }, target: 1 }),
	createEntity('dice', { position: { x: 2, y: 0 }, value: 0 }),
	createEntity('dice', { position: { x: 1, y: 1 } }),
];

const Game = () => {
	const { entities, setEntities } = useGame({
		level: { entities: level, id: '' },
	});

	const { swipeProps } = useControls({ setEntities });

	const { episodes } = useEpisodes();

	return (
		<>
			<pre>{JSON.stringify(episodes, null, 2)}</pre>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
		</>
	);
};

export default Game;
