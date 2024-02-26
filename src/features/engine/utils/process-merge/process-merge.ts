import { Dice } from '../../types/entities';
import { createEntity } from '../create-entity/create-entity';
import { getIsSameVector } from '../get-is-same-vector';

export const processMerge = ({ dices }: { dices: Dice[] }) => {
	const merged = JSON.parse(JSON.stringify(dices)) as Dice[];

	for (const dice of merged) {
		if (dice.isRemoved) {
			continue;
		}

		const index = merged.findIndex(
			(item) =>
				getIsSameVector(item.position, dice.position) &&
				item.value === dice.value &&
				item.id !== dice.id,
		);

		if (index === -1) {
			continue;
		}

		dice.isRemoved = true;
		merged[index].isRemoved = true;

		merged.push(
			createEntity('dice', {
				isFresh: true,
				position: dice.position,
				value: dice.value + 1,
			}),
		);
	}

	return { dices: merged };
};
