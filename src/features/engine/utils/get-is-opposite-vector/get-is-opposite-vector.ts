import { Vector } from '../../types/entities';

export const getIsOppositeVector = (vector1: Vector, vector2: Vector) =>
	(vector1.x !== 0 && vector1.x === -vector2.x) ||
	(vector1.y !== 0 && vector1.y === -vector2.y);
