import { VECTOR_ZERO } from '../../constants';
import { Entity, isMovable } from '../../types/entities';
import { getIsSameVector } from '../get-is-same-vector';

export const getIsMoving = (entity: Entity) =>
	isMovable(entity) && !getIsSameVector(entity.velocity, VECTOR_ZERO);
