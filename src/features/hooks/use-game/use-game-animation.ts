import { useCallback, useState } from 'react';

import { Entity } from '../../engine/types/entities';
import { getNextBoardState } from '../../engine/utils/get-next-board-state';
import { getShouldUpdate } from '../../engine/utils/get-should-update';
import { MOVE_DURATION } from '../../ui/constants';

export const useGameAnimation = ({
	disabled,
	entities,
	setEntities,
}: {
	entities: Entity[];
	setEntities: (entities: Entity[]) => void;
	disabled?: boolean;
}) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const animate = useCallback(async () => {
		setIsAnimating(true);

		const states = [{ board: { entities } }];

		let shouldUpdate = true;

		do {
			const lastState = states.at(-1);

			if (!lastState) break;

			const nextState = getNextBoardState(lastState);

			const {
				board: { entities: nextEntities },
			} = nextState;
			const {
				board: { entities: previousEntities },
			} = lastState;

			shouldUpdate = getShouldUpdate({
				entities: nextEntities,
				previousEntities,
			});

			if (shouldUpdate) {
				states.push(nextState);
			}
		} while (shouldUpdate);

		for (const state of states) {
			if (disabled) break;

			setEntities(state.board.entities);

			await new Promise((resolve) => setTimeout(resolve, MOVE_DURATION));
		}

		setIsAnimating(false);

		return states;
	}, [disabled, entities, setEntities]);

	return { animate, isAnimating };
};
