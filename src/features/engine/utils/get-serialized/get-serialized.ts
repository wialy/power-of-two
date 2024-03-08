import {
	ARROW_SET_TRIANGLE,
	getArrowSymbol,
} from '../../../ui/utils/get-arrow-symbol';
import { VECTOR_ZERO } from '../../constants';
import { Entity, isDice, isFloor, isMovable } from '../../types/entities';
import { getBounds } from '../get-bounds';
import { getIsSameVector } from '../get-is-same-vector';

const getSymbol = (entity: Entity) => {
	if (isFloor(entity)) {
		return entity.direction
			? getArrowSymbol(entity.direction, ARROW_SET_TRIANGLE)
			: entity.target
				? '!'
				: '□';
	} else if (isDice(entity)) {
		return getIsSameVector(entity.velocity, VECTOR_ZERO)
			? `${entity.value}`
			: getArrowSymbol(entity.velocity);
	} else if (isMovable(entity)) {
		return getArrowSymbol(entity.velocity);
	}
};

export const getSerialized = ({ entities }: { entities: Entity[] }) => {
	const { bottomRight, topLeft } = getBounds({ entities });

	let result = '';
	for (let { y } = topLeft; y <= bottomRight.y; y++) {
		for (let { x } = topLeft; x <= bottomRight.x; x++) {
			const entitiesAtPosition = entities.filter((current) =>
				getIsSameVector(current.position, { x, y }),
			);

			switch (entitiesAtPosition.length) {
				case 0: {
					result += ' ';

					break;
				}

				case 1: {
					result += getSymbol(entitiesAtPosition[0]);

					break;
				}

				case 2: {
					result += isMovable(entitiesAtPosition[0])
						? getSymbol(entitiesAtPosition[0])
						: getSymbol(entitiesAtPosition[1]);

					break;
				}
			}
		}

		result += '\n';
	}

	return result;
};
