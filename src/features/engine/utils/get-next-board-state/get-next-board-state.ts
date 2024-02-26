import { Board } from '../../types/board';
import {
	Dice,
	Entity,
	isDice,
	isFloor,
	isMovable,
	Movable,
} from '../../types/entities';
import { getIsSameVector } from '../get-is-same-vector';
import { processMerge } from '../process-merge/process-merge';
import { processMove } from '../process-move';

export const getNextBoardState = ({
	board,
}: {
	board: Board;
}): { board: Board } => {
	const enabledEntities = board.entities.filter((entity) => !entity.isRemoved);

	const movables: Movable[] = [];
	const others: Entity[] = [];

	for (const entity of enabledEntities) {
		if (isMovable(entity)) {
			movables.push(entity);
		} else {
			others.push(entity);
		}
	}

	const moved = processMove({
		floors: others.filter(isFloor),
		movables,
	});

	const { dices: merged } = processMerge({
		dices: moved.map(({ isFresh, ...dice }) => dice) as Dice[],
	});

	const movablesWithOnTarget = merged.map((dice) => {
		if (!isDice(dice)) {
			return dice;
		}

		const isOnTarget = others.some(
			(entity) =>
				isFloor(entity) &&
				entity.target === dice.value &&
				getIsSameVector(entity.position, dice.position),
		);

		return {
			...dice,
			isOnTarget,
		};
	});

	return {
		board: {
			entities: [...others, ...movablesWithOnTarget],
		},
	};
};
