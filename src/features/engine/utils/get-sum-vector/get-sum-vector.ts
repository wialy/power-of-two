import { Vector } from '../../types/entities';

export const getSumVector = (...vectors: Vector[]): Vector => {
	const sumVector: Vector = { x: 0, y: 0 };

	for (const vector of vectors) {
		sumVector.x += vector.x;
		sumVector.y += vector.y;
	}

	return sumVector;
};
