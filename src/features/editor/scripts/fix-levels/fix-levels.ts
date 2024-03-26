/* eslint-disable no-console */
import fs from 'node:fs';

import { getResolution } from '../../../engine/utils/get-resolution';
import { getResolutionSteps } from '../../../engine/utils/get-resolution-steps';
import { LevelRecord, SerializedLevelRecord } from '../../types';
import { getIdEntities } from '../../utils/get-id-entities';
import { getParsedLevelRecord } from '../../utils/get-parsed-level-record';
import { getSerializedLevelRecord } from '../../utils/get-serialized-level-record';
import { getSortedLevels } from '../../utils/get-sorted-levels';

const serialize = (levels: LevelRecord[]) =>
	`[\n\t${levels.map(getSerializedLevelRecord).join(',\n\t')}\n]`;

export const fixLevels = async () => {
	const episodes = fs
		.readdirSync('./public/levels')
		.filter((file) => file.endsWith('.json') && file !== 'episodes.json');

	for (const episode of episodes) {
		const levels = JSON.parse(
			fs.readFileSync(`./public/levels/${episode}`, 'utf8'),
		) as SerializedLevelRecord[];

		const updated: LevelRecord[] = [];

		for (const level of levels) {
			const record = getParsedLevelRecord(level);

			const entities = getIdEntities(record.id);

			const resolution = await getResolution({ entities });

			if (!resolution) {
				continue;
			}

			const steps = getResolutionSteps({ resolution });

			if (resolution.iteration && record.iterations !== resolution.iteration) {
				console.log(
					record.id,
					'fixing level iteration',
					record.iterations,
					'>',
					resolution.iteration,
				);
				// update record
				record.iterations = resolution.iteration;
			}

			if (record.steps !== steps.length) {
				console.log(
					record.id,
					'fixing level steps',
					record.steps,
					'>',
					steps.length,
				);
				// update record
				record.steps = steps.length;
			}

			updated.push(record);
		}

		const sorted = getSortedLevels(updated);

		console.log(
			'> writing',
			episode,
			'levels:',
			levels.length,
			'>',
			sorted.length,
		);
		fs.writeFileSync(`./public/levels/${episode}`, serialize(sorted));
	}
};
