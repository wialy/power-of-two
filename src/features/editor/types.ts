export type LevelRecord = {
	steps: number;
	id: string;
	name: string;
	iterations: number;
};

export type SerializedLevelRecord = `${string}:${string}:${string}:${string}`;
