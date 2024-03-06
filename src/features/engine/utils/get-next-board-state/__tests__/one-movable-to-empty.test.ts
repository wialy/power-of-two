import { expect, test } from 'vitest';

import { getArrowSymbol } from '../../../../ui/utils/get-arrow-symbol';
import { DIRECTIONS } from '../../../constants';
import { createEntity } from '../../create-entity';
import { getNextBoardState } from '..';

test.each(
	DIRECTIONS.map((direction) => [getArrowSymbol(direction), direction]),
)(
	"should move one %s to empty field and preserve it's velocity",
	(_symbol, direction) => {
		const entities = [
			createEntity('floor'),
			createEntity('floor', { position: direction }),
			createEntity('movable', { id: 'movable', velocity: direction }),
		];

		const result = getNextBoardState({ board: { entities } }).board.entities;

		expect(result).toBeDefined();
		expect(result).toHaveLength(3);
		expect(result).toContainEqual(
			expect.objectContaining({
				position: direction,
				type: 'movable',
				velocity: direction,
			}),
		);
	},
);
