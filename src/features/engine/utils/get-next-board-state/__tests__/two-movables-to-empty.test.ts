import { expect, test } from 'vitest';

import { getArrowSymbol } from '../../../../ui/utils/get-arrow-symbol';
import { DIRECTIONS, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getMultipliedVector } from '../../get-multiplied-vector';
import { getNextBoardState } from '..';

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	'should move first movable %s to empty field and preserve velocity of second (line)',
	(_symbol, direction) => {
		const firstPosition = direction;
		const firstVelocity = getMultipliedVector({
			multiplier: -1,
			vector: firstPosition,
		});
		const secondPosition = getMultipliedVector({
			multiplier: -1,
			vector: direction,
		});
		const secondVelocity = getMultipliedVector({
			multiplier: -1,
			vector: secondPosition,
		});

		const entities = [
			createEntity('floor'),
			createEntity('floor', { position: firstPosition }),
			createEntity('floor', { position: secondPosition }),
			createEntity('movable', {
				id: 'movable-1',
				position: firstPosition,
				velocity: firstVelocity,
			}),
			createEntity('movable', {
				id: 'movable-2',
				position: secondPosition,
				velocity: secondVelocity,
			}),
		];

		const result = getNextBoardState({ board: { entities } }).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(5);
		expect(result).toContainEqual(
			expect.objectContaining({
				position: VECTOR_ZERO,
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		);
		expect(result).toContainEqual(
			expect.objectContaining({
				position: expect.not.objectContaining(VECTOR_ZERO),
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		);
	},
);

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	'should move first movable %s to empty field and preserve velocity of second (corner)',
	(_symbol, direction) => {
		const firstPosition = direction;
		const firstVelocity = getMultipliedVector({
			multiplier: -1,
			vector: direction,
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
			createEntity('movable', {
				id: 'movable-1',
				position: firstPosition,
				velocity: firstVelocity,
			}),
			createEntity('movable', {
				id: 'movable-2',
				position: secondPosition,
				velocity: secondVelocity,
			}),
		];

		const result = getNextBoardState({ board: { entities } }).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(5);
		expect(result).toContainEqual(
			expect.objectContaining({
				position: VECTOR_ZERO,
				type: 'movable',
				velocity: expect.not.objectContaining(VECTOR_ZERO),
			}),
		);
		expect(result).toContainEqual(
			expect.objectContaining({
				position: expect.not.objectContaining(VECTOR_ZERO),
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		);
	},
);
