export const ARROW_SET_SIMPLE = '⏹↓↑→←';
export const ARROW_SET_TRIANGLE = '⏹▲▼►◄';

export const ARROW_SET_LETTERS = 'SUDRL';

export const getArrowSymbol = (
	velocity: { x: number; y: number },
	set = ARROW_SET_SIMPLE,
) => {
	if (velocity.x === 0 && velocity.y === 0) return set[0];
	if (velocity.x === 0) return velocity.y > 0 ? set[1] : set[2];

	return velocity.x > 0 ? set[3] : set[4];
};
