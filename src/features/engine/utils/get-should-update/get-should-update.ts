import { Entity, isDice, isMovable } from '../../types/entities';
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

		const hasPositionChanged = !getIsSameVector(
			entity.position,
			previousEntity.position,
		);

		const hasVelocityChanged = !getIsSameVector(
			entity.velocity,
			previousEntity.velocity,
		);

		let hasValueChanged = false;
		let hasIsFreshChanged = false;

		if (isDice(entity) && isDice(previousEntity)) {
			hasValueChanged = entity.value !== previousEntity.value;
			hasIsFreshChanged = entity.isFresh !== previousEntity.isFresh;
		}

		return (
			hasPositionChanged ||
			hasVelocityChanged ||
			hasValueChanged ||
			hasIsFreshChanged
		);
	});
};
