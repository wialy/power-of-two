import { useEffect, useRef, useState } from 'react';

import { Entity } from '../../engine/types/entities';
import { Level } from '../../engine/types/game';
import { getNextBoardState } from '../../engine/utils/get-next-board-state';
import { getShouldUpdate } from '../../engine/utils/get-should-update';
import { MOVE_DURATION } from '../../ui/constants';

export const useGame = ({
	disabled,
	level: { entities: boardEntities },
}: {
	disabled?: boolean;
	level: Level;
}) => {
	const [entities, setEntities] = useState<Entity[]>([...boardEntities]);
	const [hash, setHash] = useState('');
	const [isLocked, setIsLocked] = useState(false);

	const intervalReference = useRef<ReturnType<typeof setInterval>>();

	useEffect(() => {
		if (disabled) return;

		intervalReference.current = setInterval(
			() =>
				setEntities((previousEntities) => {
					const nextEntities = getNextBoardState({
						board: { entities: previousEntities },
					}).board.entities;

					if (getShouldUpdate({ entities: nextEntities, previousEntities })) {
						setIsLocked(true);

						return nextEntities;
					}

					setIsLocked(false);

					return previousEntities.map((entity) => ({
						...entity,
						isFresh: false,
					}));
				}),
			MOVE_DURATION,
		);

		return () => clearInterval(intervalReference.current);
	}, [disabled, hash]);

	useEffect(() => {
		setHash(JSON.stringify([...boardEntities]));
		setEntities([...boardEntities]);
	}, [boardEntities]);

	return { entities, isLocked, setEntities };
};
