import { expect, test } from 'vitest';

import { Dice, Floor } from '../../types/entities';
import { createEntity } from './create-entity';

test('should create dice with default values', () => {
	const expected: Dice = {
		id: expect.any(String),
		position: { x: 0, y: 0 },
		type: 'dice',
		value: 0,
		velocity: { x: 0, y: 0 },
	};

	expect(createEntity('dice')).toEqual(expected);
});

test('should create dice with given values', () => {
	const expected: Dice = {
		id: expect.any(String),
		position: { x: 1, y: 1 },
		type: 'dice',
		value: 2,
		velocity: { x: 1, y: 1 },
	};

	expect(createEntity('dice', expected)).toEqual(expected);
});

test('should create floor with default values', () => {
	const expected: Floor = {
		base: 'ice',
		id: expect.any(String),
		position: { x: 0, y: 0 },
		type: 'floor',
	};

	expect(createEntity('floor')).toEqual(expected);
});

test('should create floor with given values', () => {
	const expected: Floor = {
		base: 'lava',
		id: expect.any(String),
		position: { x: 1, y: 1 },
		type: 'floor',
	};

	expect(createEntity('floor', expected)).toEqual(expected);
});
