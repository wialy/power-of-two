import { expect, test } from 'vitest';

import { VECTOR_LEFT, VECTOR_UP, VECTOR_ZERO } from '../../../constants';
import { Board } from '../../../types/board';
import { createEntity } from '../../create-entity';
import { getNextBoardState } from '..';

test('passing velocity', () => {
	const board: Board = {
		entities: [
			createEntity('floor', { position: { x: 0, y: 0 } }),
			createEntity('floor', { position: { x: 1, y: 0 } }),
			createEntity('floor', { position: { x: 0, y: 1 } }),
			createEntity('movable', {
				id: 'movable-1',
				position: { x: 1, y: 0 },
				velocity: VECTOR_LEFT,
			}),
			createEntity('movable', {
				id: 'movable-2',
				position: { x: 0, y: 1 },
				velocity: VECTOR_UP,
			}),
		],
	};

	const {
		board: { entities },
	} = getNextBoardState({ board });

	expect(entities).toBeDefined();
	expect(entities).toHaveLength(5);
	expect(entities).toContainEqual(
		expect.objectContaining({
			id: 'movable-1',
			position: { x: 0, y: 0 },
			velocity: VECTOR_UP,
		}),
	);
	expect(entities).toContainEqual(
		expect.objectContaining({
			id: 'movable-2',
			position: { x: 0, y: 1 },
			velocity: VECTOR_ZERO,
		}),
	);
});
