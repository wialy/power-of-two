import { expect, test } from 'vitest';

import { getArrowSymbol } from '../../../../ui/utils/get-arrow-symbol';
import { DIRECTIONS, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getMultipliedVector } from '../../get-multiplied-vector';
import { getNextBoardState } from '..';

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	'should move both dices %s to empty field, stop them, and remove another (line)',
	(_symbol, direction) => {
		const entities = [
			createEntity('floor'),
			createEntity('floor', { position: direction }),
			createEntity('floor', {
				position: getMultipliedVector({ multiplier: -1, vector: direction }),
			}),
			createEntity('dice', {
				id: 'dice-1',
				position: getMultipliedVector({
					multiplier: -1,
					vector: direction,
				}),
				value: 1,
				velocity: direction,
			}),
			createEntity('dice', {
				id: 'dice-2',
				position: direction,
				value: 1,
				velocity: getMultipliedVector({ multiplier: -1, vector: direction }),
			}),
		];

		const result = getNextBoardState({ board: { entities } }).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(5);
		expect(result).toContainEqual(
			expect.objectContaining({
				isFresh: true,
				position: VECTOR_ZERO,
				type: 'dice',
				value: 2,
				velocity: VECTOR_ZERO,
			}),
		);
		expect(result).toContainEqual(
			expect.objectContaining({
				isRemoved: true,
				position: VECTOR_ZERO,
				type: 'dice',
				value: 1,
				velocity: VECTOR_ZERO,
			}),
		);
	},
);

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	'should move both dice %s to empty field, preserve velocity of removed one (corner)',
	(_symbol, direction) => {
		const firstPosition = direction;
		const firstVelocity = getMultipliedVector({
			multiplier: -1,
			vector: firstPosition,
		});
		const secondPosition = { x: direction.y, y: direction.x };
		const secondVelocity = getMultipliedVector({
			multiplier: -1,
			vector: secondPosition,
		});
		const entities = [
			createEntity('floor'),
			createEntity('floor', { position: firstPosition }),
			createEntity('floor', { position: secondPosition }),
			createEntity('dice', {
				id: 'movable-1',
				position: firstPosition,
				value: 1,
				velocity: firstVelocity,
			}),
			createEntity('dice', {
				id: 'movable-2',
				position: secondPosition,
				value: 1,
				velocity: secondVelocity,
			}),
		];

		const result = getNextBoardState({
			board: { entities },
		}).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(5);
		expect(result).toContainEqual(
			expect.objectContaining({
				isRemoved: true,
				position: VECTOR_ZERO,
				type: 'dice',
				velocity: VECTOR_ZERO,
			}),
		);
		expect(result).toContainEqual(
			expect.objectContaining({
				isFresh: true,
				position: VECTOR_ZERO,
				type: 'dice',
				value: 2,
				velocity: VECTOR_ZERO,
			}),
		);
	},
);
