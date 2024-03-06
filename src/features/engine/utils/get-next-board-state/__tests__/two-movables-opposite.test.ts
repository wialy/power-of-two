import { expect, test } from 'vitest';

import { getArrowSymbol } from '../../../../ui/utils/get-arrow-symbol';
import { DIRECTIONS, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getMultipliedVector } from '../../get-multiplied-vector';
import { getNextBoardState } from '..';

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	'should stop both movables when one moving %s and other is moving opposite direction',
	(_symbol, direction) => {
		const entities = [
			createEntity('floor'),
			createEntity('floor', { position: direction }),
			createEntity('movable', { id: 'movable-1', velocity: direction }),
			createEntity('movable', {
				id: 'movable-2',
				position: direction,
				velocity: getMultipliedVector({ multiplier: -1, vector: direction }),
			}),
		];

		const result = getNextBoardState({ board: { entities } }).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(4);
		expect(result).toContainEqual(
			expect.objectContaining({
				id: 'movable-1',
				position: VECTOR_ZERO,
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		);
		expect(result).toContainEqual(
			expect.objectContaining({
				id: 'movable-2',
				position: direction,
				type: 'movable',
				velocity: VECTOR_ZERO,
			}),
		);
	},
);
