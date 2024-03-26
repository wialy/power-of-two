import { expect, test } from 'vitest';

import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
} from '../../constants';
import { getPermutations } from '../get-permutations';
import { getOrderedCandidates } from '.';

const U = { id: 'movable-U', position: VECTOR_UP, velocity: VECTOR_DOWN };
const D = { id: 'movable-D', position: VECTOR_DOWN, velocity: VECTOR_UP };
const L = { id: 'movable-L', position: VECTOR_LEFT, velocity: VECTOR_RIGHT };
const R = { id: 'movable-R', position: VECTOR_RIGHT, velocity: VECTOR_LEFT };

test('empty', () => {
	expect(getOrderedCandidates({ candidates: [] })).toEqual([]);
});

test.each([U, D, L, R])('single', (candidate) => {
	expect(getOrderedCandidates({ candidates: [candidate] })).toEqual([candidate]);
});

test.each([getPermutations([L, R])])('LR', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([L, R]);
});

test.each([getPermutations([U, R])])('UR', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([U, R]);
});

test.each([getPermutations([U, L])])('UL', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([L, U]);
});

test.each([getPermutations([D, R])])('DR', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([R, D]);
});

test.each([getPermutations([D, L])])('DL', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([D, L]);
});

test.each([getPermutations([U, D])])('UD', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([U, D]);
});

test.each([getPermutations([U, D, R])])('UDR', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([U, R, D]);
});

test.each([getPermutations([U, D, L])])('UDL', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([D, L, U]);
});

test.each([getPermutations([U, R, L])])('URL', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([L, U, R]);
});

test.each([getPermutations([D, R, L])])('DRL', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([R, D, L]);
});

test.each([getPermutations([U, D, L, R])])('UDLR', (candidates) => {
	expect(getOrderedCandidates({ candidates })).toEqual([U, R, D, L]);
});
