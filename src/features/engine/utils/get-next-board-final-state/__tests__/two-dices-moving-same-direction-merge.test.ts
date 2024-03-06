import { expect, test } from 'vitest';

import { DIRECTIONS, VECTOR_ZERO } from '../../../constants';
import { isDice, Vector } from '../../../types/entities';
import { createEntity } from '../../create-entity';
import { getNextBoardFinalState } from '..';

test.each(DIRECTIONS)(
	'two dices moving %o merge and stop',
	(velocity: Vector) => {
		const level = [
			createEntity('floor', { position: { x: 0, y: 0 } }),
			createEntity('floor', { position: velocity }),
			createEntity('floor', {
				position: { x: velocity.x * 2, y: velocity.y * 2 },
			}),
			createEntity('dice', {
				position: { x: 0, y: 0 },
				value: 0,
				velocity,
			}),
			createEntity('dice', {
				position: velocity,
				value: 0,
				velocity,
			}),
		];

		const result = getNextBoardFinalState({
			entities: level,
			velocity,
		});

		expect(result).toBeDefined();
		expect(result?.entities).toHaveLength(4);
		expect(result?.entities).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					position: { x: velocity.x * 2, y: velocity.y * 2 },
					type: 'dice',
					value: 1,
					velocity: VECTOR_ZERO,
				}),
			]),
		);
		expect(result?.entities.filter(isDice)).toHaveLength(1);
	},
);
