import { expect, test } from 'vitest';

import { ID_SYMBOLS } from '../../constants';

test('ALL_SYMBOLS are unique', () => {
	const ALL_SYMBOLS = Object.values(ID_SYMBOLS).join('');

	expect(new Set(ALL_SYMBOLS).size).toBe(ALL_SYMBOLS.length);
});
