/* eslint-disable sonarjs/cognitive-complexity */
import { VECTOR_ZERO } from '../../constants';
import { Floor, isDice, Movable } from '../../types/entities';
import { getClone } from '../get-clone';
import { getIsOppositeVector } from '../get-is-opposite-vector';
import { getIsSameVector } from '../get-is-same-vector';
import { getSumVector } from '../get-sum-vector';

export const processMove = ({
	floors,
	movables,
}: {
	floors: Floor[];
	movables: Movable[];
}): Movable[] => {
	const result = getClone(movables);
	const toResolve = [...result];

	while (toResolve.length > 0) {
		const current = toResolve.shift() as Movable;

		if (current.isRemoved) {
			continue;
		}

		const currentFloor = floors.find((floor) =>
			getIsSameVector(current.position, floor.position),
		);

		if (!currentFloor) {
			continue;
		}

		if (getIsSameVector(current.velocity, VECTOR_ZERO)) {
			// resolve if it's not moving
			continue;
		}

		const nextPosition = getSumVector(current.position, current.velocity);

		const nextFloor = floors.find((floor) =>
			getIsSameVector(nextPosition, floor.position),
		);

		if (!nextFloor) {
			// stop and resolve if there is no floor at the next position
			current.velocity = getClone(VECTOR_ZERO);

			continue;
		}

		const nextMovable = result.find((movable) =>
			getIsSameVector(nextPosition, movable.position),
		);

		if (!nextMovable) {
			// move and resolve if there is no movable at the next position
			current.position = nextPosition;

			// apply the direction of the next floor if it has one
			if (nextFloor.direction) {
				current.velocity = nextFloor.direction;
			}

			continue;
		}

		if (toResolve.includes(nextMovable)) {
			if (!getIsOppositeVector(current.velocity, nextMovable.velocity)) {
				// resolve later if the next movable is not resolved yet
				toResolve.push(current);

				continue;
			}

			// stop and resolve both if the next movable is moving to the opposite direction
			current.velocity = getClone(VECTOR_ZERO);
			nextMovable.velocity = getClone(VECTOR_ZERO);
			toResolve.splice(toResolve.indexOf(nextMovable), 1);

			if (
				isDice(nextMovable) &&
				isDice(current) &&
				nextMovable.value === current.value
			) {
				// merge and resolve if the next movable is a dice and has the same value
				current.position = nextPosition;
			}

			continue;
		}

		if (getIsSameVector(current.velocity, nextMovable.velocity)) {
			// move and resolve if the next movable is moving to the same direction
			continue;
		}

		if (
			isDice(nextMovable) &&
			isDice(current) &&
			nextMovable.value === current.value &&
			!nextMovable.isFresh
		) {
			current.position = nextPosition;
			current.velocity = getClone(VECTOR_ZERO);
			nextMovable.velocity = getClone(VECTOR_ZERO);

			continue;
		}

		// stop current and unresolve next movable
		nextMovable.velocity = getClone(current.velocity);
		current.velocity = getClone(VECTOR_ZERO);
		toResolve.push(nextMovable);
	}

	return result;
};
