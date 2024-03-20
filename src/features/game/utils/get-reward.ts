export const getReward = ({
	maxMoves,
	moves,
}: {
	moves: number;
	maxMoves: number;
}) => {
	if (moves >= maxMoves) {
		return 0;
	}

	return (maxMoves - moves) * 50;
};
