import { useCallback, useEffect, useState } from 'react';

import { VECTOR_ZERO } from '../../../engine/constants';
import { getResolution } from '../../../engine/utils/get-resolution';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';
import { useEditorContext } from '../../contexts/editor-context';

export const useSolution = () => {
	const {
		level: { entities },
	} = useEditorContext();

	const [solution, setSolution] = useState<string | undefined>();

	const solve = useCallback(async () => {
		setSolution('Solving...');
		let resolutionStep = await getResolution({ entities });

		const symbols: string[] = [];
		while (resolutionStep) {
			if (resolutionStep.velocity) {
				symbols.push(getArrowSymbol(resolutionStep.velocity ?? VECTOR_ZERO));
			}

			resolutionStep = resolutionStep.previous;
		}

		if (symbols.length > 0) {
			setSolution(`Steps ${symbols.length}: ${symbols.reverse().join('')}`);
		} else {
			setSolution('No solution');
		}
	}, [entities]);

	useEffect(() => {
		setSolution(undefined);
	}, [entities]);

	return { solution, solve };
};
