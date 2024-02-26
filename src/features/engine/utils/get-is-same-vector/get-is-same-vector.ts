import { Vector } from '../../types/entities';

export const getIsSameVector = (a: Vector, b: Vector) =>
	a.x === b.x && a.y === b.y;
