import { Entity, Vector } from '../../types/entities';
import { getIsSameVector } from '../get-is-same-vector';

export const getByPosition = <T extends Entity>({
	entities,
	filter,
	position,
}: {
	entities: T[];
	position: Vector;
	filter?: (entity: Entity) => entity is T;
}): T | undefined => {
	if (filter) {
		return entities
			.filter(filter)
			.find((entity) => getIsSameVector(entity.position, position));
	}

	return entities.find((entity) =>
		getIsSameVector(entity.position, position),
	) as T;
};
