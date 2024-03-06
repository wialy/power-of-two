import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';
import { VECTOR_ZERO } from '../../constants';
import { Entity, isDice, isFloor, isMovable } from '../../types/entities';
import { getIsSameVector } from '../get-is-same-vector';

const getSymbol = (entity: Entity) => {
	if (isFloor(entity)) {
		return entity.direction
			? getArrowSymbol(entity.direction)
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

const getBounds = ({ entities }: { entities: Entity[] }) => {
	const topLeft = { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };
	const bottomRight = {
		x: Number.NEGATIVE_INFINITY,
		y: Number.NEGATIVE_INFINITY,
	};

	for (const entity of entities) {
		if (entity.position.x < topLeft.x) {
			topLeft.x = entity.position.x;
		}

		if (entity.position.y < topLeft.y) {
			topLeft.y = entity.position.y;
		}

		if (entity.position.x > bottomRight.x) {
			bottomRight.x = entity.position.x;
		}

		if (entity.position.y > bottomRight.y) {
			bottomRight.y = entity.position.y;
		}
	}

	return { bottomRight, topLeft };
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
