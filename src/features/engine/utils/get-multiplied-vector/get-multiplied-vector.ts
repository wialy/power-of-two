import { Vector } from '../../types/entities';

export const getMultipliedVector = ({
	multiplier,
	vector,
}: {
	vector: Vector;
	multiplier: number;
}): Vector => {
	const result = {
		x: vector.x * multiplier,
		y: vector.y * multiplier,
	};

	return {
		x: Object.is(result.x, -0) ? 0 : result.x,
		y: Object.is(result.y, -0) ? 0 : result.y,
	};
};
