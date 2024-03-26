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

	let next: Entity[] = entities;
	let current: Entity[] = [];

	let iterations = 30;
	do {
		current = next;
		next = getNextBoardState({ board: { entities: next } }).board.entities;
	} while (
		getShouldUpdate({ entities: next, previousEntities: current }) &&
		iterations--
	);

	if (!iterations) {
		throw new Error('Infinite loop detected');
	}

	for (const entity of current) {
		delete entity.isFresh;

		if (isMovable(entity)) {
			delete entity.isForced;
		}
	}

	return { entities: current };
};
