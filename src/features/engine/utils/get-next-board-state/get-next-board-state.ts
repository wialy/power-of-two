/* eslint-disable sonarjs/cognitive-complexity */
import { VECTOR_ZERO } from '../../constants';
import { Board } from '../../types/board';
import {
	Entity,
	Floor,
	isDice,
	isFloor,
	isMovable,
	Movable,
} from '../../types/entities';
import { getByPosition } from '../get-by-position';
import { getCanMerge } from '../get-can-merge';
import { getClone } from '../get-clone';
import { getIsMoving } from '../get-is-moving';
import { getIsOppositeVector } from '../get-is-opposite-vector';
import { getSumVector } from '../get-sum-vector';

const getByType = (entities: Entity[]) => {
	const movables: Movable[] = [];
	const others: Entity[] = [];
	const floors: Floor[] = [];

	for (const entity of entities) {
		if (isMovable(entity)) {
			movables.push(entity);
		} else if (isFloor(entity)) {
			floors.push(entity);
		} else {
			others.push(entity);
		}
	}

	return { floors, movables, others };
};

const applyFloorDirection = ({
	floor,
	movable,
}: {
	floor?: Floor;
	movable: Movable;
}) => {
	if (movable.isForced) {
		return;
	}

	if (floor) {
		if (floor.direction !== undefined) {
			movable.velocity = getClone(floor.direction);
		}
	} else {
		movable.velocity = getClone(VECTOR_ZERO);
	}
};

const mergeDices = ({ first, second }: { first: Movable; second: Movable }) => {
	if (!isDice(first) || !isDice(second)) {
		return;
	}

	first.isRemoved = true;
	first.position = getClone(second.position);
	first.velocity = getClone(VECTOR_ZERO);

	second.value++;
	second.isFresh = true;
	second.velocity = getClone(VECTOR_ZERO);
};

export const getNextBoardState = ({
	board,
}: {
	board: Board;
}): { board: Board } => {
	const entities = getClone(
		board.entities.filter((entity) => !entity.isRemoved),
	);

	const { floors, movables, others } = getByType(entities);

	for (const movable of movables) {
		const floor = getByPosition({
			entities: floors,
			filter: isFloor,
			position: movable.position,
		});

		if (!floor) {
			movable.isRemoved = true;
			movable.velocity = getClone(VECTOR_ZERO);

			continue;
		}

		applyFloorDirection({
			floor,
			movable,
		});
	}

	const toResolve = movables.filter(getIsMoving);

	while (toResolve.length > 0) {
		const current = toResolve.shift() as Movable;

		const currentFloor = getByPosition({
			entities: floors,
			filter: isFloor,
			position: current.position,
		});

		if (!currentFloor) {
			continue;
		}

		const nextPosition = getSumVector(current.position, current.velocity);

		const nextFloor = getByPosition({
			entities: floors,
			filter: isFloor,
			position: nextPosition,
		});

		// If the next position is not a floor, stop the current movable
		if (!nextFloor) {
			current.velocity = getClone(VECTOR_ZERO);

			continue;
		}

		// Check for movable at the next position
		const nextMovable = getByPosition({
			entities: movables,
			filter: isMovable,
			position: nextPosition,
		});

		if (!nextMovable) {
			// Move the current movable to the next position
			// when there is no next movable
			current.position = getClone(nextPosition);

			continue;
		}

		// check if nextMovable is waiting to be resolved
		if (toResolve.includes(nextMovable)) {
			// check if the two movables are moving in opposite directions
			if (getIsOppositeVector(current.velocity, nextMovable.velocity)) {
				// check is the two movables can merge
				if (getCanMerge(current, nextMovable)) {
					mergeDices({ first: current, second: nextMovable });
				} else {
					// stop both movables
					current.velocity = getClone(VECTOR_ZERO);
					nextMovable.velocity = getClone(VECTOR_ZERO);
				}

				// remove nextMovable from the toResolve list
				toResolve.splice(toResolve.indexOf(nextMovable), 1);
			} else {
				// add current after the nextMovable to the toResolve list
				toResolve.splice(toResolve.indexOf(nextMovable) + 1, 0, current);
			}

			continue;
		}

		if (getCanMerge(current, nextMovable)) {
			mergeDices({ first: current, second: nextMovable });
		} else {
			if (!getIsMoving(nextMovable)) {
				nextMovable.velocity = getClone(current.velocity);
			}

			current.velocity = getClone(VECTOR_ZERO);
		}
	}

	for (const movable of movables) {
		movable.isForced = false;

		const floor = getByPosition({
			entities: floors,
			filter: isFloor,
			position: movable.position,
		});

		applyFloorDirection({
			floor,
			movable,
		});

		if (isDice(movable)) {
			movable.isOnTarget = floor?.target === movable.value;
		}
	}

	return {
		board: {
			entities: [...floors, ...movables, ...others],
		},
	};
};
