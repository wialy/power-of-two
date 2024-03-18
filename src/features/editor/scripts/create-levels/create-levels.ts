// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import codenamize from '@codenamize/codenamize';

import { Entity } from '../../../engine/types/entities';
import {
	getResolution,
	ResolutionStep,
} from '../../../engine/utils/get-resolution';
import { getArrowSymbol } from '../../../ui/utils/get-arrow-symbol';
import { MAX_GRID_HEIGHT, MAX_GRID_WIDTH } from '../../constants';
import { LevelRecord } from '../../types';
import { createLevel } from '../../utils/create-level';
import { getLevelId } from '../../utils/get-level-id';

const getResolutionSteps = ({ resolution }: { resolution: ResolutionStep }) => {
	if (!resolution) {
		return [];
	}

	const steps = [];
	let resolutionStep: typeof resolution | undefined = resolution;
	while (resolutionStep) {
		steps.push(resolutionStep);
		resolutionStep = resolutionStep.previous;
	}

	return steps.slice(0, -1);
};

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

		const resolution = await getResolution({ entities });

		if (!resolution || !resolution.iteration) {
			continue;
		}

		const steps = getResolutionSteps({ resolution });

		const solution = steps
			.map((step) => step.velocity)
			.map((velocity) => (velocity ? getArrowSymbol(velocity) : '?'))
			.join('');

		if (steps.length < minSteps) {
			continue;
		}

		const levelId = getLevelId({ entities });

		const name = getName(levelId);

		// eslint-disable-next-line no-console
		console.log(
			[
				seed.toString().padStart(5, ' '),
				steps.length.toString().padStart(3, ' '),
				resolution.iteration.toString().padStart(6, ' '),
				solution.padStart(30, ' '),
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
