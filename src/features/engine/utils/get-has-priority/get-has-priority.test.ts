import { expect, test } from 'vitest';

import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
} from '../../constants';
import { createEntity } from '../create-entity';
import { getHasPriority } from '.';

test('opposite left and right', () => {
	const a = createEntity('movable', {
		position: { x: 0, y: 0 },
		velocity: VECTOR_RIGHT,
	});
	const b = createEntity('movable', {
		position: { x: 1, y: 0 },
		velocity: VECTOR_LEFT,
	});

	expect(getHasPriority(a, b)).toBeTruthy();
});

test('opposite top and bottom', () => {
	const a = createEntity('movable', {
		position: { x: 0, y: 0 },
		velocity: VECTOR_DOWN,
	});
	const b = createEntity('movable', {
		position: { x: 0, y: 1 },
		velocity: VECTOR_UP,
	});

	expect(getHasPriority(a, b)).toBeTruthy();
});

test('down and right', () => {
	const a = createEntity('movable', {
		position: { x: 0, y: 0 },
		velocity: VECTOR_DOWN,
	});
	const b = createEntity('movable', {
		position: { x: -1, y: 1 },
		velocity: VECTOR_RIGHT,
	});

	expect(getHasPriority(a, b)).toBeFalsy();
	expect(getHasPriority(b, a)).toBeTruthy();
});

test('down and left', () => {
	const a = createEntity('movable', {
		position: { x: 0, y: 0 },
		velocity: VECTOR_DOWN,
	});

	const b = createEntity('movable', {
		position: { x: 1, y: 1 },
		velocity: VECTOR_LEFT,
	});

	expect(getHasPriority(a, b)).toBeTruthy();
	expect(getHasPriority(b, a)).toBeFalsy();
});

test('up and right', () => {
	const a = createEntity('movable', {
		position: { x: 0, y: 0 },
		velocity: VECTOR_UP,
	});

	const b = createEntity('movable', {
		position: { x: -1, y: -1 },
		velocity: VECTOR_RIGHT,
	});

	expect(getHasPriority(a, b)).toBeTruthy();
	expect(getHasPriority(b, a)).toBeFalsy();
});

test('up and left', () => {
	const a = createEntity('movable', {
		position: { x: 0, y: 0 },
		velocity: VECTOR_UP,
	});

	const b = createEntity('movable', {
		position: { x: 1, y: -1 },
		velocity: VECTOR_LEFT,
	});

	expect(getHasPriority(a, b)).toBeFalsy();
	expect(getHasPriority(b, a)).toBeTruthy();
});
