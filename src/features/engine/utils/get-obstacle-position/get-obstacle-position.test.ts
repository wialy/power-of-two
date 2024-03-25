import { expect, test } from 'vitest';

import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
} from '../../constants';
import { createEntity } from '../create-entity';
import { getObstaclePosition } from '.';

const D = createEntity('movable', {
	position: { x: 0, y: -1 },
	velocity: VECTOR_DOWN,
});

const R = createEntity('movable', {
	position: { x: -1, y: 0 },
	velocity: VECTOR_RIGHT,
});

const U = createEntity('movable', {
	position: { x: 0, y: 1 },
	velocity: VECTOR_UP,
});

const L = createEntity('movable', {
	position: { x: 1, y: 0 },
	velocity: VECTOR_LEFT,
});

// .D.
// R.L
// .U.

const INPUT = [U, D, L, R].map(({ position, velocity }) => ({
	position,
	velocity,
}));
const OUTPUT = [L, R, D, U].map(({ position }) => position);

test.each(INPUT.map((input, index) => [input, OUTPUT[index]]))(
	'%o %o',
	(input, output) => {
		expect(getObstaclePosition(input)).toEqual(output);
	},
);
