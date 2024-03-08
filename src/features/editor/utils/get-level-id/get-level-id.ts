import {
	Entity,
	isDice,
	isFloor,
	isMovable,
} from '../../../engine/types/entities';
import { getBounds } from '../../../engine/utils/get-bounds';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import {
	ARROW_SET_LETTERS,
	getArrowSymbol,
} from '../../../ui/utils/get-arrow-symbol';

const TARGET_SYMBOLS = 'qwertyui';
const FLOOR_SYMBOL = 'o';
const EMPTY_SYMBOL = 'x';
const MOVABLE_SYMBOL = 'm';
const DELIMITER = '-';
const DICE_SYMBOLS = '0123456789';

export const ALL_SYMBOLS =
	TARGET_SYMBOLS +
	FLOOR_SYMBOL +
	EMPTY_SYMBOL +
	MOVABLE_SYMBOL +
	ARROW_SET_LETTERS +
	DELIMITER +
	DICE_SYMBOLS;

const getEntitySymbol = (entity: Entity) => {
	if (isFloor(entity) && entity.direction !== undefined) {
		return getArrowSymbol(entity.direction, ARROW_SET_LETTERS);
	}

	if (isFloor(entity) && entity.target !== undefined) {
		return TARGET_SYMBOLS[entity.target];
	}

	if (isFloor(entity)) {
		return FLOOR_SYMBOL;
	}

	if (isDice(entity)) {
		return DICE_SYMBOLS[entity.value];
	}

	if (isMovable(entity)) {
		return MOVABLE_SYMBOL;
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
				row += EMPTY_SYMBOL;

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

	return result.join('-');
};
