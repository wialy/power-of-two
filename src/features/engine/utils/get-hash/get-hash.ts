import { Entity, isMovable } from '../../types/entities';

export const getHash = ({ entities }: { entities: Entity[] }) =>
	JSON.stringify(
		entities.filter(isMovable).map(({ id, ...movable }) => ({
			...movable,
		})),
	);
