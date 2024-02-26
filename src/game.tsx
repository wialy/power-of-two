import './global.css';

import { Entity } from './features/engine/types/entities';
import { createEntity } from './features/engine/utils/create-entity/create-entity';
import { useControls } from './features/hooks/use-controls';
import { useGame } from './features/hooks/use-game';
import { BoardView } from './features/ui/components/board-view';
import { SwipeArea } from './features/ui/components/swipe-area';

const level: Entity[] = [];

const getRandomDirection = () => {
	if (Math.random() > 0.75) {
		if (Math.random() > 0.25) {
			return { x: 0, y: 1 };
		} else if (Math.random() > 0.5) {
			return { x: 1, y: 0 };
		} else if (Math.random() > 0.75) {
			return { x: 0, y: -1 };
		}

		return { x: -1, y: 0 };
	}
};

for (let row = 0; row < 7; row++) {
	for (let column = 0; column < 5; column++) {
		level.push(
			createEntity('floor', {
				direction: getRandomDirection(),
				position: { x: row, y: column },
			}),
		);
	}
}

level.push(createEntity('dice', { position: { x: 0, y: 0 }, value: 0 }));
for (let index = 0; index < 7; index++) {
	level.push(
		createEntity('dice', { position: { x: index, y: 4 }, value: index }),
	);
}

for (let index = 0; index < 7; index++) {
	level.push(createEntity('movable', { position: { x: index, y: 3 } }));
}

const Game = () => {
	const { entities, setEntities } = useGame({
		level: { board: { entities: level } },
	});

	const { swipeProps } = useControls({ setEntities });

	return (
		<>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
		</>
	);
};

export default Game;
