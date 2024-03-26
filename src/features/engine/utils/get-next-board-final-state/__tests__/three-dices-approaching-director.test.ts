import { expect, test } from 'vitest';

import { VECTOR_LEFT, VECTOR_RIGHT, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getNextBoardFinalState } from '..';

test('three dices approaching director left', () => {
	const entities = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
		createEntity('floor', {
			direction: VECTOR_LEFT,
			position: { x: 3, y: 0 },
		}),
		createEntity('dice', {
			id: 'movable-1',
			isForced: true,
			position: { x: 0, y: 0 },
			value: 1,
			velocity: VECTOR_RIGHT,
		}),
		createEntity('dice', {
			id: 'movable-2',
			position: { x: 1, y: 0 },
			value: 1,
			velocity: VECTOR_RIGHT,
		}),
		createEntity('dice', {
			id: 'movable-3',
			position: { x: 2, y: 0 },
			value: 1,
			velocity: VECTOR_RIGHT,
		}),
	];

	const state = getNextBoardFinalState({ entities });

	expect(state).toBeDefined();
	expect(state?.entities).toHaveLength(6);
	expect(state?.entities).toContainEqual(
		expect.objectContaining({
			id: 'movable-1',
			isOnTarget: false,
			position: { x: 0, y: 0 },
			type: 'dice',
			value: 1,
			velocity: VECTOR_ZERO,
		}),
	);

	expect(state?.entities).toContainEqual(
		expect.objectContaining({
			id: 'movable-3',
			isOnTarget: false,
			position: { x: 1, y: 0 },
			type: 'dice',
			value: 2,
			velocity: VECTOR_ZERO,
		}),
	);
});

test('three dices approaching director right', () => {
	const entities = [
		createEntity('floor', { direction: VECTOR_RIGHT, position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
		createEntity('floor', {
			position: { x: 3, y: 0 },
		}),
		createEntity('dice', {
			id: 'movable-1',
			isForced: true,
			position: { x: 1, y: 0 },
			value: 1,
			velocity: VECTOR_LEFT,
		}),
		createEntity('dice', {
			id: 'movable-2',
			position: { x: 2, y: 0 },
			value: 1,
			velocity: VECTOR_LEFT,
		}),
		createEntity('dice', {
			id: 'movable-3',
			position: { x: 3, y: 0 },
			value: 1,
			velocity: VECTOR_LEFT,
		}),
	];

	const state = getNextBoardFinalState({ entities });

	expect(state).toBeDefined();
	expect(state?.entities).toHaveLength(6);
	expect(state?.entities).toContainEqual(
		expect.objectContaining({
			id: 'movable-2',
			isOnTarget: false,
			position: { x: 1, y: 0 },
			type: 'dice',
			value: 2,
			velocity: VECTOR_ZERO,
		}),
	);

	expect(state?.entities).toContainEqual(
		expect.objectContaining({
			id: 'movable-3',
			isOnTarget: false,
			position: { x: 2, y: 0 },
			type: 'dice',
			value: 1,
			velocity: VECTOR_ZERO,
		}),
	);
});
