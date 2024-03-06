import { expect, test } from 'vitest';

import { VECTOR_RIGHT, VECTOR_ZERO } from '../../../constants';
import { isDice } from '../../../types/entities';
import { createEntity } from '../../create-entity';
import { getNextBoardFinalState } from '..';

test('two dices moving same direction merge', () => {
	const level = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
		createEntity('floor', { position: { x: 3, y: 0 } }),
		createEntity('dice', {
			position: { x: 0, y: 0 },
			value: 0,
			velocity: VECTOR_RIGHT,
		}),
		createEntity('dice', {
			position: { x: 1, y: 0 },
			value: 0,
			velocity: VECTOR_ZERO,
		}),
	];

	const result = getNextBoardFinalState({
		entities: level,
		velocity: VECTOR_RIGHT,
	});

	expect(result).toBeDefined();
	expect(result?.entities).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				position: { x: 3, y: 0 },
				type: 'dice',
				value: 1,
				velocity: VECTOR_ZERO,
			}),
		]),
	);
	expect(result?.entities.filter(isDice)).toHaveLength(1);
});
