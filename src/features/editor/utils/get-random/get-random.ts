// predictive random

let seed = 0;

export const setRandomSeed = (value: number) => {
	seed = value;
};

// returns a number between 0 and 1
export const getRandom = () => {
	seed = (seed * 9301 + 49_297) % 233_280;

	return seed / 233_280;
};
