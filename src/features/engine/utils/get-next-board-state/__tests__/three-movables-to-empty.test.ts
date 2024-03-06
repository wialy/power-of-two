import { expect, test } from 'vitest';

import { getArrowSymbol } from '../../../../ui/utils/get-arrow-symbol';
import { DIRECTIONS, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getMultipliedVector } from '../../get-multiplied-vector';
import { getNextBoardState } from '..';

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	"should move one of three %s to empty field, preserve it's velocity and stop others",
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
		const thirdPosition = getMultipliedVector({
			multiplier: -1,
			vector: direction,
		});
		const thirdVelocity = direction;

		const entities = [
			createEntity('floor'),
			createEntity('floor', { position: firstPosition }),
			createEntity('floor', { position: secondPosition }),
			createEntity('floor', { position: thirdPosition }),
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
			createEntity('movable', {
				id: 'movable-3',
				position: thirdPosition,
				velocity: thirdVelocity,
			}),
		];

		const result = getNextBoardState({ board: { entities } }).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(7);
		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					position: VECTOR_ZERO,
					type: 'movable',
					velocity: expect.not.objectContaining(VECTOR_ZERO),
				}),
				expect.objectContaining({
					type: 'movable',
					velocity: VECTOR_ZERO,
				}),
				expect.objectContaining({
					type: 'movable',
					velocity: VECTOR_ZERO,
				}),
			]),
		);
	},
);
