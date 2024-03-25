import { Movable } from '../../types/entities';
import { getIsOppositeVector } from '../get-is-opposite-vector';
import { getIsSameVector } from '../get-is-same-vector';
import { getObstaclePosition } from '../get-obstacle-position';

export const getHasPriority = (a: Movable, b: Movable) => {
	if (getIsOppositeVector(a.velocity, b.velocity)) {
		// the one moving from top to bottom has priority
		// the one moving from left to right has priority
		return a.velocity.x > b.velocity.x || a.velocity.y > b.velocity.y;
	}

	const obstaclePosition = getObstaclePosition(a);

	return !getIsSameVector(obstaclePosition, b.position);
};
