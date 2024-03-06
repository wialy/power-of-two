import { DIRECTIONS, VECTOR_ZERO } from '../engine/constants';
import { createEntity } from '../engine/utils/create-entity';

export const MAX_GRID_WIDTH = 5;
export const MAX_GRID_HEIGHT = 7;

export const ENTITIES = [
	createEntity('floor'),
	...[VECTOR_ZERO, ...DIRECTIONS].map((direction) =>
		createEntity('floor', { direction }),
	),
	...Array.from({ length: 7 }, (_, target) => createEntity('floor', { target })),
	createEntity('movable'),
	...Array.from({ length: 7 }, (_, value) => createEntity('dice', { value })),
];
