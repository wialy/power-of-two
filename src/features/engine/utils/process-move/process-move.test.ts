import { expect, test } from 'vitest';

import { createEntity } from '../create-entity/create-entity';
import { processMove } from '.';

test('should not move dices with no velocity', () => {
	const dice = createEntity('dice', {
		velocity: { x: 0, y: 0 },
	});

	const movables = [dice];
	const floors = [
		createEntity('floor'),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	expect(processMove({ floors, movables })).toEqual([dice]);
});

test('should not move and stop when there is no floor', () => {
	const dice = createEntity('dice', {
		velocity: { x: 1, y: 0 },
	});

	const movables = [dice];
	const floors = [createEntity('floor')];

	expect(
		processMove({
			floors,
			movables,
		}),
	).toEqual([{ ...dice, velocity: { x: 0, y: 0 } }]);
});

test('should move and preserve velocity when there is a floor', () => {
	const dice = createEntity('dice', {
		velocity: { x: 1, y: 0 },
	});

	const movables = [dice];
	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	expect(
		processMove({
			floors,
			movables,
		}),
	).toEqual([{ ...dice, position: { x: 1, y: 0 }, velocity: { x: 1, y: 0 } }]);
});

test('should pass velocity to the next movable and move it if possible', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 1,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		value: 2,
		velocity: { x: 0, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
	];

	const expectedResult = [
		{ ...dice1, position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 2, y: 0 }, velocity: { x: 1, y: 0 } },
	];

	// dice1 first
	const result1 = processMove({
		floors,
		movables: [dice1, dice2],
	});

	expect(result1).toHaveLength(expectedResult.length);
	expect(result1).toEqual(expect.arrayContaining(expectedResult));

	// dice2 first
	const result2 = processMove({
		floors,
		movables: [dice2, dice1],
	});

	expect(result2).toHaveLength(expectedResult.length);
	expect(result2).toEqual(expect.arrayContaining(expectedResult));
});

test('should stop when next movable can not be moved further', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 1,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		value: 2,
		velocity: { x: 0, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
	];

	// dice1 first
	expect(
		processMove({
			floors,
			movables: [dice1, dice2],
		}),
	).toEqual(expect.arrayContaining(result));

	// dice2 first
	expect(
		processMove({
			floors,
			movables: [dice2, dice1],
		}),
	).toEqual(expect.arrayContaining(result));
});

test('should move last in a row of movables', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 1,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		value: 2,
		velocity: { x: 0, y: 0 },
	});
	const dice3 = createEntity('dice', {
		id: 'dice-3',
		position: { x: 2, y: 0 },
		value: 3,
		velocity: { x: 0, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
		createEntity('floor', { position: { x: 3, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice3, position: { x: 3, y: 0 }, velocity: { x: 1, y: 0 } },
	];

	expect(
		processMove({
			floors,
			movables: [dice1, dice2, dice3],
		}),
	).toEqual(expect.arrayContaining(result));
});

test('should stop both movables when they are moving towards each other and are not dices of same value', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 0,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		value: 1,
		velocity: { x: -1, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
	];

	expect(
		processMove({
			floors,
			movables: [dice1, dice2],
		}),
	).toEqual(expect.arrayContaining(result));
});

test('should merge dices when they are moving towards each other and are dices of the same value', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 1,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		value: 1,
		velocity: { x: -1, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
	];

	expect(
		processMove({
			floors,
			movables: [dice1, dice2],
		}),
	).toEqual(expect.arrayContaining(result));
});

test('should move both movables when they are moving in the same direction', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		velocity: { x: 1, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
		createEntity('floor', { position: { x: 2, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 1, y: 0 }, velocity: { x: 1, y: 0 } },
		{ ...dice2, position: { x: 2, y: 0 }, velocity: { x: 1, y: 0 } },
	];

	expect(
		processMove({
			floors,
			movables: [dice1, dice2],
		}),
	).toEqual(expect.arrayContaining(result));
});

test('should move when next is dice of same value', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 1,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		position: { x: 1, y: 0 },
		value: 1,
		velocity: { x: 0, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
	];

	expect(
		processMove({
			floors,
			movables: [dice1, dice2],
		}),
	).toEqual(expect.arrayContaining(result));
});

test('should not move into a fresh dice of same value', () => {
	const dice1 = createEntity('dice', {
		id: 'dice-1',
		position: { x: 0, y: 0 },
		value: 1,
		velocity: { x: 1, y: 0 },
	});
	const dice2 = createEntity('dice', {
		id: 'dice-2',
		isFresh: true,
		position: { x: 1, y: 0 },
		value: 1,
		velocity: { x: 0, y: 0 },
	});

	const floors = [
		createEntity('floor', { position: { x: 0, y: 0 } }),
		createEntity('floor', { position: { x: 1, y: 0 } }),
	];

	const result = [
		{ ...dice1, position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } },
		{ ...dice2, position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 } },
	];

	expect(
		processMove({
			floors,
			movables: [dice1, dice2],
		}),
	).toEqual(expect.arrayContaining(result));
});
