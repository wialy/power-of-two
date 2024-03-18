import {
	Entity,
	isDice,
	isFloor,
	isMovable,
} from '../../../engine/types/entities';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';
import { ID_SYMBOLS } from '../../constants';

export const getEntitySymbol = (entity: Entity) => {
	if (isFloor(entity) && entity.direction !== undefined) {
		return getArrowSymbol(entity.direction, ID_SYMBOLS.directors);
	}

	if (isFloor(entity) && entity.target !== undefined) {
		return ID_SYMBOLS.target[entity.target];
	}

	if (isFloor(entity)) {
		return ID_SYMBOLS.floor;
	}

	if (isDice(entity)) {
		return ID_SYMBOLS.dice[entity.value];
	}

	if (isMovable(entity)) {
		return ID_SYMBOLS.movable;
	}
};
