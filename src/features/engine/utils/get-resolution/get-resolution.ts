import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
} from '../../constants';
import {
	Dice,
	Entity,
	Floor,
	isDice,
	isFloor,
	Vector,
} from '../../types/entities';
import { getHash } from '../get-hash';
import { getIsSameVector } from '../get-is-same-vector';
import { getNextBoardFinalState } from '../get-next-board-final-state';

export type ResolutionStep = {
	entities: Entity[];
	velocity?: Vector;
	previous?: ResolutionStep;
	hash?: string;
	iteration?: number;
};

const DIRECTIONS = [VECTOR_UP, VECTOR_DOWN, VECTOR_LEFT, VECTOR_RIGHT];

const MAX_ITERATIONS = 10_000;
const MAX_STEP_EXECUTION_TIME = 40;

const getIsResolved = ({
	dices,
	targetFloors,
}: {
	dices: Dice[];
	targetFloors: Floor[];
}) =>
	targetFloors.length === dices.length &&
	dices.every((dice) =>
		targetFloors.some(
			(floor) =>
				floor.target === dice.value &&
				getIsSameVector(floor.position, dice.position),
		),
	);

const getIsLost = ({
	dices,
	targetFloors,
}: {
	dices: Dice[];
	targetFloors: Floor[];
}) => dices.length < targetFloors.length;

// This function is not pure, it mutates the toResolve array
const addStatesToResolve = ({
	nextBoard,
	previous,
	toResolve,
	velocity,
}: {
	toResolve: ResolutionStep[];
	nextBoard?: { entities: Entity[] };
	previous: ResolutionStep;
	velocity: Vector;
}) => {
	// If next board state can not be determined, continue to the next direction
	if (!nextBoard) {
		return;
	}

	// If the next board state is the same as the previous state, continue to the next direction
	const hash = getHash(nextBoard);

	if (toResolve.some((resolvedStep) => resolvedStep.hash === hash)) {
		return;
	}

	// Add the next board state to the list of states to resolve
	toResolve.push({
		entities: nextBoard.entities,
		hash,
		previous,
		velocity,
	});
};

function* iterate({ entities }: { entities: Entity[] }) {
	const toResolve: ResolutionStep[] = [{ entities, iteration: 0 }];

	let iteration = 0;

	const floors = entities.filter(isFloor);
	const targetFloors = floors.filter((floor) => floor.target !== undefined);

	let executionStart = Date.now();

	while (iteration < MAX_ITERATIONS) {
		const executionTime = Date.now() - executionStart;

		if (executionTime > MAX_STEP_EXECUTION_TIME) {
			executionStart = Date.now();
			yield;
		}

		const step = toResolve[iteration++];

		if (!step) {
			return;
		}

		step.iteration = iteration;

		const dices = step.entities.filter(isDice);

		if (getIsLost({ dices, targetFloors })) {
			continue;
		}

		// Check if the current board state is resolved
		if (getIsResolved({ dices, targetFloors })) {
			// Solution found
			return step;
		}

		// For each direction, get the next board state
		for (const direction of DIRECTIONS) {
			const nextBoard = getNextBoardFinalState({
				entities: step.entities,
				velocity: direction,
			});

			// Add the next board state to the list of states to resolve
			addStatesToResolve({
				nextBoard,
				previous: step,
				toResolve,
				velocity: direction,
			});
		}
	}
}

export const getResolution = async ({
	entities,
}: {
	entities: Entity[];
}): Promise<ResolutionStep | undefined> => {
	const iterator = iterate({ entities });

	return new Promise((resolve) => {
		const intervalId = setInterval(() => {
			const result = iterator.next();

			if (result.value !== undefined) {
				clearInterval(intervalId);

				return resolve(result.value);
			}

			if (result.done) {
				clearInterval(intervalId);

				return resolve(undefined);
			}
		}, 0);
	});
};
