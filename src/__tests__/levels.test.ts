// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useEpisodeLevels } from '../features/editor/hooks/use-episode-levels';
import { useEpisodes } from '../features/editor/hooks/use-episodes';
import { EpisodeRecord, LevelRecord } from '../features/editor/types';
import { getIdEntities } from '../features/editor/utils/get-id-entities';
import { getParsedLevelRecord } from '../features/editor/utils/get-parsed-level-record';
import {
	getResolution,
	ResolutionStep,
} from '../features/engine/utils/get-resolution';
import { getResolutionSteps } from '../features/engine/utils/get-resolution-steps';
import { fetchPublicPolyfill } from '../features/tests/utils/fetch-public-polyfill';

type LevelRecordWithEpisode = {
	episode: string;
	level: LevelRecord;
};

global.fetch = fetchPublicPolyfill;

const { result: useEpisodesResult } = renderHook(() => useEpisodes());

// Wait for the episodes to load
await vi.waitFor(() => {
	if (useEpisodesResult.current.isLoading) {
		throw new Error('loading');
	}
});

const { episodes } = useEpisodesResult.current;

const levels: LevelRecordWithEpisode[] = [];

// Test the episodes are loaded and are non-empty array
test('episodes', () => {
	expect(episodes).toEqual(expect.any(Array));
	expect(episodes.length).toBeGreaterThan(0);
});

// Test the episodes have the expected EpisodeRecord shape
test.each(episodes)('episode %j', (episode) => {
	expect(episode).toMatchObject<EpisodeRecord>({
		levels: expect.any(Number),
		name: expect.any(String),
		symbols: expect.any(String),
	});
});

// Load levels for each episode
// and add them to the levels array
for (const episode of episodes) {
	const { result: useEpisodeLevelsResult } = renderHook(() =>
		useEpisodeLevels({ episode: episode.symbols }),
	);

	await vi.waitFor(() => {
		if (useEpisodeLevelsResult.current.isLoading) {
			throw new Error('loading');
		}
	});

	const { levels: episodeLevels } = useEpisodeLevelsResult.current;

	levels.push(
		...episodeLevels.map((level) => ({
			episode: episode.symbols,
			level: getParsedLevelRecord(level),
		})),
	);
}

// Test the levels are loaded and are non-empty array
test('levels', () => {
	expect(levels).toEqual(expect.any(Array));
	expect(levels.length).toBeGreaterThan(0);
});

// Test the levels have the expected LevelRecord shape
test.each(levels)('level %j resolution', ({ level }) => {
	expect(level).toMatchObject<LevelRecord>({
		id: expect.any(String),
		iterations: expect.any(Number),
		name: expect.any(String),
		steps: expect.any(Number),
	});
});

// Test the resolution of the levels
test.each(levels)(
	'level %j resolution',
	async ({ level: { id, iterations, steps } }) => {
		const resolution = await getResolution({
			entities: getIdEntities(id),
		});

		expect(resolution).toMatchObject<ResolutionStep>({
			entities: expect.any(Array),
			hash: expect.any(String),
			iteration: expect.any(Number),
			previous: expect.any(Object),
			velocity: expect.any(Object),
		});

		expect(resolution?.iteration).toBe(iterations);

		const resolutionSteps = resolution ? getResolutionSteps({ resolution }) : [];

		expect(resolutionSteps).toEqual(expect.any(Array));
		expect(resolutionSteps.length).toEqual(steps);
	},
);
