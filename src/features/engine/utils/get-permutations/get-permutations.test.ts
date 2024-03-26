import { expect, test } from 'vitest';

import { getPermutations } from '.';

test('empty', () => {
	expect(getPermutations([])).toEqual([]);
});

test('single', () => {
	expect(getPermutations([1])).toEqual([[1]]);
});

test('double', () => {
	expect(getPermutations([1, 2])).toEqual([
		[1, 2],
		[2, 1],
	]);
});

test('triple', () => {
	expect(getPermutations([1, 2, 3])).toHaveLength(6);
});

test('quadruple', () => {
	expect(getPermutations([1, 2, 3, 4])).toHaveLength(24);
});
