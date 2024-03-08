import { expect, test } from 'vitest';

import { ALL_SYMBOLS } from '.';

test('ALL_SYMBOLS are unique', () => {
	expect(new Set(ALL_SYMBOLS)).toHaveLength(ALL_SYMBOLS.length);
});
