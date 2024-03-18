import { LevelRecord, SerializedLevelRecord } from '../../types';

export const getParsedLevelRecord = (
	serializedLevelRecord: SerializedLevelRecord,
): LevelRecord => {
	const [steps, iterations, id, name] = serializedLevelRecord.split(':');

	return {
		id,
		iterations: Number(iterations),
		name,
		steps: Number(steps),
	};
};
