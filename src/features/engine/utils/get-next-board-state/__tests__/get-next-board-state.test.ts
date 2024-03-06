import { describe, expect, test } from 'vitest';

import { createEntity } from '../../create-entity/create-entity';
import { getNextBoardState } from '..';

describe('getNextBoardState', () => {
	test('should return the same board', () => {
		expect(getNextBoardState({ board: { entities: [] } })).toEqual({
			board: { entities: [] },
		});
	});

	test('should return the same board with new entities', () => {
		const entities = [createEntity('floor')];

		expect(
			getNextBoardState({
				board: { entities },
			}),
		).toEqual({
			board: { entities },
		});
	});
});
