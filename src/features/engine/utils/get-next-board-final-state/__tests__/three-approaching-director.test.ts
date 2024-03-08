import { expect, test } from 'vitest';

import { VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getNextBoardFinalState } from '..';

test('three approaching director', () => {
	const entities = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
		createEntity('floor', {
			direction: { x: -1, y: 0 },
			position: { x: 3, y: 0 },
		}),
		createEntity('movable', {
			id: 'movable-1',
			position: { x: 0, y: 0 },
			velocity: { x: 1, y: 0 },
		}),
		createEntity('movable', {
			id: 'movable-2',
			position: { x: 1, y: 0 },
			velocity: { x: 1, y: 0 },
		}),
		createEntity('movable', {
			id: 'movable-3',
			position: { x: 2, y: 0 },
			velocity: { x: 1, y: 0 },
		}),
	];

	const state = getNextBoardFinalState({ entities });

	expect(state).toBeDefined();
	expect(state?.entities).toHaveLength(7);
	expect(state?.entities).toEqual(
		expect.arrayContaining([
			{
				id: 'movable-1',
				isForced: false,
				isFresh: false,
				position: { x: 0, y: 0 },
				type: 'movable',
				velocity: VECTOR_ZERO,
			},
			{
				id: 'movable-2',
				isForced: false,
				isFresh: false,
				position: { x: 1, y: 0 },
				type: 'movable',
				velocity: VECTOR_ZERO,
			},
			{
				id: 'movable-3',
				isForced: false,
				isFresh: false,
				position: { x: 2, y: 0 },
				type: 'movable',
				velocity: VECTOR_ZERO,
			},
		]),
	);
});
