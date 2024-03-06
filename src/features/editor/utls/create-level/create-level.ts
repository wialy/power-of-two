/* eslint-disable sonarjs/cognitive-complexity */
import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity, Floor, isFloor, Vector } from '../../../engine/types/entities';
import { getClone } from '../../../engine/utils/get-clone';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import { getSumVector } from '../../../engine/utils/get-sum-vector';
import { MAX_GRID_HEIGHT, MAX_GRID_WIDTH } from '../../constants';
import { getRandom, setRandomSeed } from '../get-random';

const MAX_FLOOR_POSITION_ITERATIONS = 100;

export const createLevel = ({
	entities: availableEntities,
	seed,
}: {
	seed: number;
	entities: Array<Omit<Entity, 'position'>>;
}) => {
	setRandomSeed(seed);

	const result: Entity[] = [];

	const shuffledEntities = availableEntities.sort(() => getRandom() - 0.5);

	const floors = shuffledEntities.filter(isFloor);

	const directors = floors.filter((entity) => entity.direction !== undefined);
	const otherFloors = floors.filter((entity) => entity.direction === undefined);

	for (const { direction, ...director } of directors) {
		otherFloors.push(director);
	}

	const currentPosition: Vector = {
		x: Math.floor(MAX_GRID_WIDTH / 2),
		y: Math.floor(MAX_GRID_HEIGHT / 2),
	};

	let isBroken = false;

	while (otherFloors.length > 0) {
		const floor = otherFloors.pop();

		if (!floor) {
			break;
		}

		result.push({
			...floor,
			position: { ...currentPosition },
		} as Floor);

		let nextPosition: Vector = { x: 0, y: 0 };
		let floorPositionIterations = 0;

		do {
			nextPosition = { ...currentPosition };

			if (getRandom() > 0.5) {
				nextPosition.x += getRandom() > 0.5 ? 1 : -1;
			} else {
				nextPosition.y += getRandom() > 0.5 ? 1 : -1;
			}

			floorPositionIterations++;

			if (floorPositionIterations >= MAX_FLOOR_POSITION_ITERATIONS) {
				break;
			}
		} while (
			nextPosition.x < 0 ||
			nextPosition.x >= MAX_GRID_WIDTH ||
			nextPosition.y < 0 ||
			nextPosition.y >= MAX_GRID_HEIGHT ||
			getIsSameVector(nextPosition, currentPosition) ||
			result.some(
				(entity) =>
					getIsSameVector(entity.position, nextPosition) && entity.type === 'floor',
			)
		);

		currentPosition.x = nextPosition.x;
		currentPosition.y = nextPosition.y;

		if (floorPositionIterations >= MAX_FLOOR_POSITION_ITERATIONS) {
			isBroken = true;

			break;
		}
	}

	if (isBroken) {
		return;
	}

	while (directors.length > 0) {
		const director = directors.pop();

		if (!director?.direction) {
			break;
		}

		if (getIsSameVector(director.direction, VECTOR_ZERO)) {
			const cleanFloors = result.filter(
				(entity) =>
					isFloor(entity) &&
					entity.direction === undefined &&
					entity.target === undefined,
			) as Floor[];

			cleanFloors[Math.floor(getRandom() * cleanFloors.length)].direction =
				getClone(director.direction);

			continue;
		}

		const floorsWithNeighbor = result.filter(
			(floor) =>
				isFloor(floor) &&
				floor.target === undefined &&
				result.some(
					(someFloor) =>
						someFloor.id !== floor.id &&
						director.direction &&
						getIsSameVector(
							someFloor.position,
							getSumVector(floor.position, director.direction),
						),
				),
		);

		if (floorsWithNeighbor.length === 0) {
			continue;
		}

		const floor =
			floorsWithNeighbor[Math.floor(getRandom() * floorsWithNeighbor.length)];

		if (!floor) {
			continue;
		}

		(floor as Floor).direction = director.direction;
	}

	const floorPositions = result
		.filter(
			(entity) =>
				(entity as Floor).target === undefined &&
				(entity as Floor).direction === undefined,
		)
		.map((entity) => entity.position)
		.sort(() => getRandom() - 0.5);

	const movables = shuffledEntities.filter(
		(entity) => entity.type === 'movable' || entity.type === 'dice',
	);

	for (const [movableIndex, movable] of movables.entries()) {
		const position: Vector = floorPositions[movableIndex];

		result.push({
			...movable,
			position,
		});
	}

	return result;
};
