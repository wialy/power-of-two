/* eslint-disable no-console */
import fs from 'node:fs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import codenamize from '@codenamize/codenamize';

import { ID_SYMBOLS } from '../../constants';
import { SerializedLevelRecord } from '../../types';

const getDicesAmount = (symbols: string) =>
	[...symbols].filter((symbol) => ID_SYMBOLS.dice.includes(symbol)).length;

const getTargetsAmount = (symbols: string) =>
	[...symbols].filter((symbol) => ID_SYMBOLS.target.includes(symbol)).length;

const getDirectorsAmount = (symbols: string) =>
	[...symbols].filter((symbol) => ID_SYMBOLS.directors.includes(symbol)).length;

const getFloorsAmount = (symbols: string) =>
	[...symbols].filter((symbol) => ID_SYMBOLS.floor.includes(symbol)).length;

const getMovableAmount = (symbols: string) =>
	[...symbols].filter((symbol) => ID_SYMBOLS.movable.includes(symbol)).length;

export const updateEpisodes = () => {
	const folder = './public/levels';

	const EPISODES_FILE_NAME = 'episodes.json';
	// read all files

	const files = fs
		.readdirSync(folder)
		.filter((file) => file.endsWith('.json') && file !== EPISODES_FILE_NAME);

	const episodes = [];
	for (const file of files) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: SerializedLevelRecord[] = JSON.parse(
			fs.readFileSync(`${folder}/${file}`, 'utf8'),
		);

		const symbols = file.split('.')[0];

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const name = codenamize({
			capitalize: true,
			seed: symbols,
			separator: ' ',
		}) as string;

		episodes.push({ levels: data.length, name, symbols });
	}

	const sortedEpisodes = episodes
		.sort(
			(a, b) =>
				getTargetsAmount(b.symbols) - getTargetsAmount(a.symbols) ||
				getDirectorsAmount(b.symbols) - getDirectorsAmount(a.symbols) ||
				getDicesAmount(b.symbols) - getDicesAmount(a.symbols) ||
				getMovableAmount(b.symbols) - getMovableAmount(a.symbols) ||
				getFloorsAmount(b.symbols) - getFloorsAmount(a.symbols) ||
				a.name.localeCompare(b.name),
		)
		.reverse();

	// write episodes to file
	fs.writeFileSync(
		`${folder}/${EPISODES_FILE_NAME}`,
		JSON.stringify(sortedEpisodes, null, 2),
	);

	console.log(`Created ${sortedEpisodes.length} episodes`);
};
