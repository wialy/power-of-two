import { getIsVector } from '../../types/entities';

export const getClone = <T>(value: T): T => {
	if (getIsVector(value)) {
		return { ...value } as T;
	}

	return JSON.parse(JSON.stringify(value)) as T;
};
