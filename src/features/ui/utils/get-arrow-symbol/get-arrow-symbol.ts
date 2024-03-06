export const getArrowSymbol = (velocity: { x: number; y: number }) => {
	if (velocity.x === 0 && velocity.y === 0) return '⏹';
	if (velocity.x === 0) return velocity.y > 0 ? '↓' : '↑';

	return velocity.x > 0 ? '→' : '←';
};
