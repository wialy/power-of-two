import {
	Dice,
	Director,
	Entity,
	Floor,
	isDice,
	isDirector,
	isFloor,
	isMovable,
	isTarget,
	Movable,
	Target,
} from '../../types/entities';

export const getGroupedByType = ({ entities }: { entities: Entity[] }) => {
	const movables: Movable[] = [];
	const dices: Dice[] = [];
	const floors: Floor[] = [];
	const directors: Director[] = [];
	const targets: Target[] = [];

	for (const entity of entities) {
		if (isMovable(entity)) {
			if (isDice(entity)) {
				dices.push(entity);
			} else {
				movables.push(entity);
			}
		} else if (isFloor(entity)) {
			if (isDirector(entity)) {
				directors.push(entity);
			} else if (isTarget(entity)) {
				targets.push(entity);
			} else {
				floors.push(entity);
			}
		}
	}

	return { dices, directors, floors, movables, targets };
};
