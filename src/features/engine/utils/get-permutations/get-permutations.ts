export const getPermutations = <T>(array: T[]) => {
	if (array.length === 1) {
		return [array];
	}

	const result: T[][] = [];

	for (let index = 0; index < array.length; index++) {
		const current = array[index];
		const remaining = [...array.slice(0, index), ...array.slice(index + 1)];

		const permutations = getPermutations(remaining);
		for (const permutation of permutations) {
			result.push([current, ...permutation]);
		}
	}

	return result;
};
