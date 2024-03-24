import { useCallback, useEffect, useState } from 'react';

import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity } from '../../../engine/types/entities';
import { getResolution } from '../../../engine/utils/get-resolution';
import { getResolutionSteps } from '../../../engine/utils/get-resolution-steps';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';

export const useSolution = ({ entities }: { entities: Entity[] }) => {
	const [solution, setSolution] = useState<string | undefined>();
	const [iterations, setIterations] = useState<number | undefined>();
	const [steps, setSteps] = useState<number | undefined>();

	const solve = useCallback(async () => {
		setSolution('Solving...');
		const lastStep = await getResolution({ entities });

		if (!lastStep) {
			setSolution('💩 No solution');

			return;
		}

		setIterations(lastStep.iteration);

		const resolutionSteps = getResolutionSteps({ resolution: lastStep });
		const symbols: string[] = resolutionSteps.map((step) =>
			getArrowSymbol(step.velocity ?? VECTOR_ZERO),
		);

		if (symbols.length > 0) {
			setSteps(symbols.length);
			setSolution(`💡 ${symbols.join('')}`);
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
