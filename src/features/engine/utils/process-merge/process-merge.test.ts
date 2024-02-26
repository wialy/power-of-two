import { expect, test } from 'vitest';

import { createEntity } from '../create-entity/create-entity';
import { processMerge } from '.';

test('should merge dices', () => {
	const dices = [
		createEntity('dice', { id: 'dice-1', position: { x: 0, y: 0 }, value: 1 }),
		createEntity('dice', { id: 'dice-2', position: { x: 0, y: 0 }, value: 1 }),
	];

	const { dices: result } = processMerge({ dices });

	expect(result).toHaveLength(3);
	expect(result).toEqual(
		expect.arrayContaining([
			expect.objectContaining({ isFresh: true, value: 2 }),
			expect.objectContaining({ id: 'dice-1', isRemoved: true }),
			expect.objectContaining({ id: 'dice-2', isRemoved: true }),
		]),
	);
});

test('should not merge dices on different position', () => {
	const dices = [
		createEntity('dice', { position: { x: 0, y: 0 }, value: 1 }),
		createEntity('dice', { position: { x: 0, y: 1 }, value: 1 }),
	];

	const { dices: result } = processMerge({ dices });

	expect(result).toHaveLength(2);
	expect(result).toEqual(dices);
});

test('should not merge dices of different value', () => {
	const dices = [
		createEntity('dice', { position: { x: 0, y: 0 }, value: 1 }),
		createEntity('dice', { position: { x: 0, y: 0 }, value: 2 }),
	];

	const { dices: result } = processMerge({ dices });

	expect(result).toHaveLength(2);
	expect(result).toEqual(dices);
});
