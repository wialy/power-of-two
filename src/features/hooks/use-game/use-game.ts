import { useEffect, useState } from 'react';

import { Entity } from '../../engine/types/entities';
import { Level } from '../../engine/types/game';
import { getNextBoardState } from '../../engine/utils/get-next-board-state';
import { MOVE_DURATION } from '../../ui/components/constants';

export const useGame = ({
	disabled,
	level: { board },
}: {
	disabled?: boolean;
	level: Level;
}) => {
	const [entities, setEntities] = useState<Entity[]>([...board.entities]);

	useEffect(() => {
		if (disabled) return;

		const interval = setInterval(() => {
			setEntities((previousEntities) => {
				const nextBoardState = getNextBoardState({
					board: { entities: previousEntities },
				});

				return nextBoardState.board.entities;
			});
		}, MOVE_DURATION);

		return () => clearInterval(interval);
	}, [disabled]);

	return { entities, setEntities };
};
