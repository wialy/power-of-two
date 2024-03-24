import { Dice, Entity, Floor, isDice, isFloor } from '../../types/entities';

export const getIsResolved = (
	parameters: { dices: Dice[]; targets: Floor[] } | { entities: Entity[] },
) => {
	let dices: Dice[] = [];
	let targets: Floor[] = [];

	if ('entities' in parameters) {
		dices = parameters.entities.filter(isDice);
		targets = parameters.entities
			.filter(isFloor)
			.filter((floor) => floor.target !== undefined);
	} else {
		({ dices, targets } = parameters);
	}

	const targetsCount = targets.length;
	if (targetsCount === 0) {
		return false;
	}

	const dicesCount = dices.length;
	if (dicesCount === 0) {
		return false;
	}

	return dicesCount === targetsCount && dices.every((dice) => dice.isOnTarget);
};
