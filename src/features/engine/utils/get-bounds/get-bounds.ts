import { Entity } from '../../types/entities';

export const getBounds = ({ entities }: { entities: Entity[] }) => {
	const topLeft = {
		x: Number.MAX_SAFE_INTEGER,
		y: Number.MAX_SAFE_INTEGER,
	};
	const bottomRight = {
		x: Number.MIN_SAFE_INTEGER,
		y: Number.MIN_SAFE_INTEGER,
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
