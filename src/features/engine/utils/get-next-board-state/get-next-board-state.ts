/* eslint-disable sonarjs/cognitive-complexity */
import { VECTOR_ZERO } from '../../constants';
import { Board } from '../../types/board';
import { Dice, Director, isDice, Movable } from '../../types/entities';
import { getByPosition } from '../get-by-position';
import { getCanMerge } from '../get-can-merge';
import { getClone } from '../get-clone';
import { getGroupedByType } from '../get-grouped-by-type';
import { getIsOppositeVector } from '../get-is-opposite-vector';
import { getIsSameVector } from '../get-is-same-vector';
import { getOrderedCandidates } from '../get-ordered-candidates';
import { getSumVector } from '../get-sum-vector';
import { mergeDices } from '../merge-dices';

const applyFloorDirection = ({
	floor,
	movables,
}: {
	floor: Director;
	movables: Movable[];
}) => {
	const movablesAtPosition = movables.filter(
		(movable) =>
			!movable.isForced && getIsSameVector(movable.position, floor.position),
	);

	for (const movable of movablesAtPosition) {
		movable.velocity = getClone(floor.direction);
	}
};

const resolve = ({ current, next }: { current: Movable; next: Movable }) => {
	if (getCanMerge(current, next)) {
		mergeDices({
			keep: next as Dice,
			remove: current as Dice,
		});
	} else {
		next.velocity = getIsOppositeVector(current.velocity, next.velocity)
			? getClone(VECTOR_ZERO)
			: getClone(current.velocity);

		current.velocity = getClone(VECTOR_ZERO);
	}
};

export const getNextBoardState = ({
	board: { entities: initialEntities },
}: {
	board: Board;
}): { board: Board } => {
	const entities = initialEntities
		.filter(({ isRemoved }) => !isRemoved)
		.map(getClone);

	const { dices, directors, floors, movables, targets } = getGroupedByType({
		entities,
	});

	const allMovables = [...dices, ...movables];
	const allFloors = [...floors, ...directors, ...targets];

	for (const director of directors) {
		applyFloorDirection({ floor: director, movables: allMovables });
	}

	const toResolve = allMovables.filter(
		({ velocity }) => !getIsSameVector(velocity, VECTOR_ZERO),
	);

	while (toResolve.length > 0) {
		const current = toResolve.shift();

		if (!current) {
			break;
		}

		const { position, velocity } = current;
		const nextPosition = getSumVector(position, velocity);

		const nextFloor = getByPosition({
			entities: allFloors,
			position: nextPosition,
		});

		if (!nextFloor) {
			// stop the current movable
			current.velocity = getClone(VECTOR_ZERO);

			continue;
		}

		const nextUnresolvedMovable = getByPosition({
			entities: toResolve,
			position: nextPosition,
		});

		if (nextUnresolvedMovable) {
			// resolve if the two movables are moving in opposite directions
			if (getIsOppositeVector(current.velocity, nextUnresolvedMovable.velocity)) {
				// resolve and remove next movable from the toResolve
				resolve({ current, next: nextUnresolvedMovable });

				toResolve.splice(toResolve.indexOf(nextUnresolvedMovable), 1);
			} else {
				// add the current to the toResolve
				toResolve.push(current);
			}

			continue;
		}

		const candidates = toResolve.filter((movable) =>
			getIsSameVector(
				getSumVector(movable.position, movable.velocity),
				nextPosition,
			),
		);

		const ordered = getOrderedCandidates({
			candidates: [current, ...candidates],
		}) as Movable[];

		for (const movable of ordered) {
			// remove movable from toResolve
			const index = toResolve.indexOf(movable);
			if (index !== -1) {
				toResolve.splice(index, 1);
			}

			const candidateNextPosition = getSumVector(
				movable.position,
				movable.velocity,
			);

			const nextMovable = getByPosition({
				entities: allMovables,
				position: candidateNextPosition,
			});

			if (!nextMovable) {
				movable.position = getClone(candidateNextPosition);

				continue;
			}

			resolve({ current: movable, next: nextMovable });
		}
	}

	for (const movable of allMovables) {
		delete movable.isForced;

		if (isDice(movable)) {
			const target = getByPosition({
				entities: targets,
				position: movable.position,
			});

			movable.isOnTarget = target?.target === movable.value;
		}
	}

	for (const director of directors) {
		applyFloorDirection({ floor: director, movables: allMovables });
	}

	return { board: { entities } };
};
