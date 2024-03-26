import { expect, test } from 'vitest';

import { VECTOR_RIGHT, VECTOR_UP } from '../../../constants';
import { Board } from '../../../types/board';
import { createEntity } from '../../create-entity';
import { getNextBoardState } from '..';

test('one from director', () => {
	const board: Board = {
		entities: [
			createEntity('floor', { direction: VECTOR_UP, position: { x: 0, y: 0 } }),
			createEntity('floor', { position: { x: 1, y: 0 } }),
			createEntity('movable', {
				isForced: true,
				position: { x: 0, y: 0 },
				velocity: VECTOR_RIGHT,
			}),
		],
	};
	const {
		board: { entities },
	} = getNextBoardState({ board });

	expect(entities).toBeDefined();
	expect(entities).toHaveLength(3);

	expect(entities).toContainEqual(
		expect.objectContaining({
			position: { x: 1, y: 0 },
			velocity: VECTOR_RIGHT,
		}),
	);
});
