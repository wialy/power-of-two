import { LevelRecord, SerializedLevelRecord } from '../../types';

export const getSerializedLevelRecord = ({
	id,
	iterations,
	name,
	steps,
}: LevelRecord): SerializedLevelRecord =>
	`"${steps}:${iterations}:${id}:${name}"`;
