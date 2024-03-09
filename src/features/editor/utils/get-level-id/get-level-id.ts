import {
	Entity,
	isDice,
	isFloor,
	isMovable,
} from '../../../engine/types/entities';
import { getBounds } from '../../../engine/utils/get-bounds';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';
import { ID_SYMBOLS } from '../../constants';

const getEntitySymbol = (entity: Entity) => {
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

export const getLevelId = ({ entities }: { entities: Entity[] }) => {
	const { bottomRight, topLeft } = getBounds({ entities });

	const result = [];
	for (let { y } = topLeft; y <= bottomRight.y; y++) {
		let row = '';
		for (let { x } = topLeft; x <= bottomRight.x; x++) {
			const entitiesAtPosition = entities.filter((current) =>
				getIsSameVector(current.position, { x, y }),
			);

			if (entitiesAtPosition.length === 0) {
				row += ID_SYMBOLS.empty;

				continue;
			}

			const movable = entitiesAtPosition.find(isMovable);
			if (movable) {
				row += getEntitySymbol(movable);

				continue;
			}

			row += getEntitySymbol(entitiesAtPosition[0]);
		}

		result.push(row);
	}

	return result.join(ID_SYMBOLS.delimiter);
};
