/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */
import fs from 'node:fs';

import cli from 'command-line-args';

import { Entity } from '../../../engine/types/entities';
import { LevelRecord, SerializedLevelRecord } from '../../types';
import { getParsedLevelRecord } from '../../utils/get-parsed-level-record';
import { getSerializedLevelRecord } from '../../utils/get-serialized-level-record';
import { getSymbolEntity } from '../../utils/get-symbol-entity';
import { createLevels } from './create-levels';

const getSortedLevels = (levels: LevelRecord[]) =>
	levels.sort((a, b) => a.steps - b.steps || a.iterations - b.iterations);

const serialize = (levels: LevelRecord[]) =>
	`[\n\t${levels.map(getSerializedLevelRecord).join(',\n\t')}\n]`;

// read from script arguments
const options = cli([
	{ alias: 's', defaultValue: 3, name: 'steps', type: Number },
	{ alias: 't', defaultValue: 100, name: 'total', type: Number },
	{ alias: 'f', defaultValue: 0, name: 'from', type: Number },
	{ alias: 'h', name: 'help', type: Boolean },
	{ alias: 'e', defaultValue: 'oooo0q', name: 'entities' },
]);

const { entities: symbols, from, help, steps, total } = options;

if (help) {
	console.log('Options:');
	console.log('-s, --steps:\t\tminimum steps for the level');
	console.log('-e, --entities:\t\tstring of entity symbols');
	console.log('-f, --from:\t\tstart seed');
	console.log('-t, --total:\t\ttotal levels to generate');
	console.log('-h, --help:\t\tshow this help');
	process.exit(0);
}

const sortedSymbols = [...(symbols as string)].sort().join('');

console.log(
	`Creating ${total} levels with ${sortedSymbols} symbols starting from ${from} and minimum ${steps} steps`,
);

const entities = [...sortedSymbols]
	.map(getSymbolEntity)
	.filter(Boolean) as Entity[];

if (entities.length !== sortedSymbols.length) {
	console.error('Invalid symbols');
	process.exit(1);
}

const levels = await createLevels({
	entities,
	minSteps: steps,
	start: from,
	total,
});

console.log(`Created ${levels.length} levels`);

const folder = './public/levels';

const fileName = `${sortedSymbols}.json`;

const path = `${folder}/${fileName}`;
// read file if exists

if (fs.existsSync(path)) {
	// append to file
	const file = fs.readFileSync(path, 'utf8');
	const data = JSON.parse(file) as SerializedLevelRecord[];
	const levelsData = data.map(getParsedLevelRecord);

	const uniqueLevels: LevelRecord[] = [];
	for (const level of [...levelsData, ...levels]) {
		if (!uniqueLevels.some(({ id }) => id === level.id)) {
			uniqueLevels.push(level);
		}
	}

	const newLevels = getSortedLevels(uniqueLevels);

	console.log(`Appending to ${fileName}, ${newLevels.length} levels total`);
	fs.writeFileSync(path, serialize(newLevels));
	process.exit(0);
}

const file = fs.createWriteStream(path);

console.log(`Creating new file ${fileName}, ${levels.length} levels total`);
file.write(serialize(getSortedLevels(levels)));
file.end();
