import { expect, test } from 'vitest';

import { VECTOR_RIGHT, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getNextBoardState } from '..';

test('one moving at stop', () => {
	const entities = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { direction: VECTOR_ZERO, position: { x: 1, y: 0 } }),
		createEntity('movable', { position: { x: 0, y: 0 }, velocity: VECTOR_RIGHT }),
	];
	const result = getNextBoardState({ board: { entities } });
	expect(result.board.entities).toBeDefined();
	expect(result.board.entities).toHaveLength(3);
	expect(result.board.entities).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				position: { x: 1, y: 0 },
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		]),
	);
});

test('movable at stop', () => {
	const entities = [
		createEntity('floor', { direction: VECTOR_ZERO, position: { x: 0, y: 0 } }),
		createEntity('movable', { position: { x: 0, y: 0 }, velocity: VECTOR_ZERO }),
	];
	const result = getNextBoardState({ board: { entities } });
	expect(result.board.entities).toBeDefined();
	expect(result.board.entities).toHaveLength(2);
	expect(result.board.entities).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				position: { x: 0, y: 0 },
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		]),
	);
});
