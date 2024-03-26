import { VECTOR_ZERO } from '../../constants';
import { Dice } from '../../types/entities';
import { getClone } from '../get-clone';

export const mergeDices = ({ keep, remove }: { keep: Dice; remove: Dice }) => {
	remove.isRemoved = true;
	remove.position = getClone(keep.position);
	remove.velocity = getClone(VECTOR_ZERO);

	keep.value++;
	keep.isFresh = true;
	keep.velocity = getClone(VECTOR_ZERO);
};
