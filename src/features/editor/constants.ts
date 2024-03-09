import { DIRECTIONS, VECTOR_ZERO } from '../engine/constants';
import { createEntity } from '../engine/utils/create-entity';
import { ARROW_SET_LETTERS } from '../ui/utils/get-arrow-symbol';

export const MAX_GRID_WIDTH = 5;
export const MAX_GRID_HEIGHT = 9;

export const ENTITIES = [
	createEntity('floor'),
	...[VECTOR_ZERO, ...DIRECTIONS].map((direction) =>
		createEntity('floor', { direction }),
	),
	...Array.from({ length: 7 }, (_, target) => createEntity('floor', { target })),
	createEntity('movable'),
	...Array.from({ length: 7 }, (_, value) => createEntity('dice', { value })),
];

export const ID_SYMBOLS = {
	delimiter: '-',
	dice: '0123456789',
	directors: ARROW_SET_LETTERS,
	empty: 'x',
	floor: 'o',
	movable: 'm',
	target: 'qwertyui',
};
