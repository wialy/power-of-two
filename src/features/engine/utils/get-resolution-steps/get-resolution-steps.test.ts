import { expect, test } from 'vitest';

import { VECTOR_UP, VECTOR_ZERO } from '../../constants';
import { ResolutionStep } from '../get-resolution';
import { getResolutionSteps } from './';

test('getResolutionSteps', () => {
	const previousStep: ResolutionStep = {
		entities: [],
		iteration: 0,
		previous: undefined,
		velocity: VECTOR_ZERO,
	};

	const lastStep: ResolutionStep = {
		entities: [],
		iteration: 0,
		previous: previousStep,
		velocity: VECTOR_UP,
	};

	const result = getResolutionSteps({ lastStep });

	expect(result).toEqual([previousStep, lastStep]);
});
