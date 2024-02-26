import { Entity, isMovable } from '../../types/entities';

export const getHasMovingEntities = (entities: Entity[]): boolean =>
	entities.some(
		(entity) =>
			isMovable(entity) && (entity.velocity.x !== 0 || entity.velocity.y !== 0),
	);
