import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
	VECTOR_ZERO,
} from '../../constants';
import { Vector } from '../../types/entities';
import { getIsSameVector } from '../get-is-same-vector';
import { getSumVector } from '../get-sum-vector';

export const getObstaclePosition = ({
	position = VECTOR_ZERO,
	velocity,
}: {
	velocity: Vector;
	position?: Vector;
}) => {
	if (getIsSameVector(velocity, VECTOR_UP)) {
		return getSumVector(position, { x: 1, y: -1 });
	} else if (getIsSameVector(velocity, VECTOR_LEFT)) {
		return getSumVector(position, { x: -1, y: -1 });
	} else if (getIsSameVector(velocity, VECTOR_DOWN)) {
		return getSumVector(position, { x: -1, y: 1 });
	} else if (getIsSameVector(velocity, VECTOR_RIGHT)) {
		return getSumVector(position, { x: 1, y: 1 });
	}

	return VECTOR_ZERO;
};
