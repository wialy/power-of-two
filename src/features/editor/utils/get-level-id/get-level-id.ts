import { Entity, isMovable } from '../../../engine/types/entities';
import { getBounds } from '../../../engine/utils/get-bounds';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import { ID_SYMBOLS } from '../../constants';
import { getEntitySymbol } from '../get-entity-symbol';

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
