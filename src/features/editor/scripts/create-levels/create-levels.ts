// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import codenamize from '@codenamize/codenamize';

import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity } from '../../../engine/types/entities';
import { getResolution } from '../../../engine/utils/get-resolution';
import { getResolutionSteps } from '../../../engine/utils/get-resolution-steps';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';
import { MAX_GRID_HEIGHT, MAX_GRID_WIDTH } from '../../constants';
import { LevelRecord } from '../../types';
import { createLevel } from '../../utils/create-level';
import { getIdEntities } from '../../utils/get-id-entities';
import { getLevelId } from '../../utils/get-level-id';

export const getName = (id: string): string =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	codenamize({ capitalize: true, seed: id, separator: ' ' });
export const createLevels = async ({
	entities: availableEntities,
	minSteps = 3,
	start = 0,
	total = 30,
}: {
	entities: Entity[];
	total?: number;
	start?: number;
	minSteps?: number;
}) => {
	const levels: Array<LevelRecord> = [];

	for (let seed = start; seed < start + total; seed++) {
		const entities = createLevel({ entities: availableEntities, seed });

		if (!entities?.length) {
			continue;
		}

		const levelId = getLevelId({ entities });

		const resolution = await getResolution({ entities: getIdEntities(levelId) });

		if (!resolution || !resolution.iteration) {
			continue;
		}

		const steps = getResolutionSteps({ resolution });

		if (steps.length < minSteps) {
			continue;
		}

		const name = getName(levelId);

		// eslint-disable-next-line no-console
		console.log(
			[
				seed.toString().padStart(5, ' '),
				steps.length.toString().padStart(3, ' '),
				resolution.iteration.toString().padStart(6, ' '),
				steps
					.map((step) => getArrowSymbol(step.velocity ?? VECTOR_ZERO))
					.join('')
					.padStart(20, ' '),
				levelId.padStart(MAX_GRID_HEIGHT * MAX_GRID_WIDTH, ' '),
				name,
			].join('\t'),
		);

		levels.push({
			id: levelId,
			iterations: resolution.iteration,
			name,
			steps: steps.length,
		});
	}

	return levels;
};
