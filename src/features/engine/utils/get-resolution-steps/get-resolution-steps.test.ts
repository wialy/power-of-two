import { expect, test } from 'vitest';

import { VECTOR_DOWN, VECTOR_UP } from '../../constants';
import { ResolutionStep } from '../get-resolution';
import { getResolutionSteps } from './';

test('getResolutionSteps', () => {
	const firstStep: ResolutionStep = {
		entities: [],
		iteration: 0,
		previous: undefined,
	};

	const secondStep: ResolutionStep = {
		entities: [],
		iteration: 1,
		previous: firstStep,
		velocity: VECTOR_DOWN,
	};

	const thirdStep: ResolutionStep = {
		entities: [],
		iteration: 0,
		previous: secondStep,
		velocity: VECTOR_UP,
	};

	const result = getResolutionSteps({ resolution: thirdStep });

	expect(result).toEqual([secondStep, thirdStep]);
});
