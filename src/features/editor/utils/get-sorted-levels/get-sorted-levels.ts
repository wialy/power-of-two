import { LevelRecord } from '../../types';

export const getSortedLevels = (levels: LevelRecord[]) =>
	levels.sort((a, b) => a.steps - b.steps || a.iterations - b.iterations);
