import { Entity, isMovable } from '../../types/entities';
import { getIsSameVector } from '../get-is-same-vector';

export const getShouldUpdate = ({
	entities,
	previousEntities,
}: {
	entities: Entity[];
	previousEntities: Entity[];
}): boolean => {
	if (previousEntities.length !== entities.length) return true;

	const movables = entities.filter(isMovable);
	const previousMovables = previousEntities.filter(isMovable);

	return movables.some((entity) => {
		const previousEntity = previousMovables.find(
			(current) => current.id === entity.id,
		);

		if (!previousEntity) return true;

		return (
			!getIsSameVector(entity.position, previousEntity.position) ||
			!getIsSameVector(entity.velocity, previousEntity.velocity)
		);
	});
};
