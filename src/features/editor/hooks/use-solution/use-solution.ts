import { useCallback, useEffect, useState } from 'react';

import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity } from '../../../engine/types/entities';
import { getResolution } from '../../../engine/utils/get-resolution';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';

export const useSolution = ({ entities }: { entities: Entity[] }) => {
	const [solution, setSolution] = useState<string | undefined>();
	const [iterations, setIterations] = useState<number | undefined>();
	const [steps, setSteps] = useState<number | undefined>();

	const solve = useCallback(async () => {
		setSolution('Solving...');
		let resolutionStep = await getResolution({ entities });

		if (resolutionStep) {
			setIterations(resolutionStep.iteration);
		}

		const symbols: string[] = [];
		while (resolutionStep) {
			if (resolutionStep.velocity) {
				symbols.push(getArrowSymbol(resolutionStep.velocity ?? VECTOR_ZERO));
			}

			resolutionStep = resolutionStep.previous;
		}

		if (symbols.length > 0) {
			setSteps(symbols.length);
			setSolution(`💡 ${symbols.reverse().join('')}`);
		} else {
			setSteps(undefined);
			setIterations(undefined);
			setSolution('💩 No solution');
		}
	}, [entities]);

	useEffect(() => {
		setSolution(undefined);
		setIterations(undefined);
		setSteps(undefined);
	}, [entities]);

	return { iterations, solution, solve, steps };
};
