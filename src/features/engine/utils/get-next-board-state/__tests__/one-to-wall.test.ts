import { expect, test } from 'vitest';

import { getArrowSymbol } from '../../../../ui/utils/get-arrow-symbol';
import { DIRECTIONS, VECTOR_ZERO } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getNextBoardState } from '..';

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)('should stop one when there is no floor %s', (_symbol, direction) => {
	const entities = [
		createEntity('floor'),
		createEntity('movable', { id: 'movable', velocity: direction }),
	];

	const result = getNextBoardState({ board: { entities } }).board.entities;

	expect(result).toBeDefined();
	expect(result).toHaveLength(2);
	expect(result).toContainEqual(
		expect.objectContaining({
			id: 'movable',
			position: VECTOR_ZERO,
			velocity: VECTOR_ZERO,
		}),
	);
});
