import { Dice, Entity, Floor, isDice, isFloor } from '../../types/entities';

export const getIsUnsolvable = (
	parameters:
		| { entities: Entity[] }
		| {
				dices: Dice[];
				targets: Floor[];
		  },
) => {
	let dices: Dice[] = [];
	let targetFloors: Floor[] = [];

	if ('entities' in parameters) {
		dices = parameters.entities.filter(isDice);
		targetFloors = parameters.entities
			.filter(isFloor)
			.filter((floor) => floor.target !== undefined);
	} else {
		({ dices, targets: targetFloors } = parameters);
	}

	const targetFloorsCount = targetFloors.length;
	const dicesCount = dices.length;

	return (
		targetFloorsCount === 0 || dicesCount === 0 || dicesCount < targetFloorsCount
	);
};
