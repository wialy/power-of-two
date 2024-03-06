import { Entity, isMovable, Vector } from '../../types/entities';
import { getNextBoardState } from '../get-next-board-state';
import { getShouldUpdate } from '../get-should-update';

export const getNextBoardFinalState = ({
	entities: originalEntities,
	velocity,
}: {
	entities: Entity[];
	velocity?: Vector;
}): { entities: Entity[] } | undefined => {
	// apply velocity to all movable entities
	const entities = velocity
		? originalEntities.map((entity) => {
				if (isMovable(entity)) {
					return {
						...entity,
						isForced: true,
						velocity,
					};
				}

				return { ...entity };
			})
		: originalEntities;

	for (const entity of entities) {
		entity.isFresh = false;
	}

	let nextEntities: Entity[] = entities;
	let previousEntities: Entity[] = [];

	let iterations = 30;
	do {
		previousEntities = nextEntities;
		nextEntities = getNextBoardState({ board: { entities: nextEntities } }).board
			.entities;
	} while (
		getShouldUpdate({ entities: nextEntities, previousEntities }) &&
		iterations--
	);

	const result = previousEntities.map((entity) => ({
		...entity,
	}));

	return { entities: result };
};
