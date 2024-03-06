import { expect, test } from 'vitest';

import { VECTOR_DOWN, VECTOR_LEFT, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getNextBoardFinalState } from '..';

test.only('two same dices taking one floor', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		velocity: VECTOR_DOWN,
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 1 },
		velocity: VECTOR_LEFT,
	});
	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 0, y: 1 } }),
		createEntity('floor', { position: { x: 1, y: 1 } }),
	];

	const entities = [dice1, dice2, ...floors];

	const result = getNextBoardFinalState({ entities });

	expect(result?.entities).toBeDefined();
	expect(result?.entities).toHaveLength(5);
	expect(result?.entities).toContainEqual(
		expect.objectContaining({
			isFresh: true,
			position: { x: 0, y: 1 },
			type: 'dice',
			velocity: VECTOR_ZERO,
		}),
	);
});
