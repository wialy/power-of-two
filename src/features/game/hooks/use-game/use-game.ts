import { useEffect, useRef, useState } from 'react';

import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity, isMovable } from '../../../engine/types/entities';
import { Level } from '../../../engine/types/game';
import { useGameState } from '../use-game-state';
import { useGameAnimation } from './use-game-animation';

const getSortedMovables = (entities: Entity[]) =>
	entities
		.filter(isMovable)
		.map(({ id, position }) => ({ id, position }))
		.sort((a, b) => (a.id > b.id ? 1 : -1));

const getSnapshot = (entities: Entity[]) =>
	JSON.stringify(getSortedMovables(entities));

export const useGame = ({
	disabled,
	level: { entities: boardEntities },
}: {
	disabled?: boolean;
	level: Level;
}) => {
	const { countMove } = useGameState();

	const [entities, setEntities] = useState<Entity[]>([...boardEntities]);
	const [isLocked, setIsLocked] = useState(false);

	const isMounted = useRef(false);

	const { animate, isAnimating } = useGameAnimation({
		disabled: disabled || !isMounted.current,
		entities,
		setEntities,
	});

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	const snapshot = useRef('');

	useEffect(() => {
		// react to forced movable entities
		const hasForcedEntity = entities
			.filter(isMovable)
			.some((entity) => entity.isForced);

		if (hasForcedEntity && !isLocked) {
			setIsLocked(true);
			snapshot.current = getSnapshot(entities);
		}
	}, [entities, isLocked]);

	useEffect(() => {
		if (disabled) {
			return;
		}

		if (isLocked && !isAnimating) {
			void (async () => {
				await animate();

				setIsLocked(false);

				setEntities((current) => {
					const result = current.map((entity) =>
						isMovable(entity)
							? {
									...entity,
									isForced: false,
									isFresh: false,
									velocity: VECTOR_ZERO,
								}
							: entity,
					);

					if (snapshot.current !== getSnapshot(result) && snapshot.current !== '') {
						snapshot.current = '';
						countMove();
					}

					return result;
				});
			})();
		}
	}, [animate, countMove, disabled, entities, isAnimating, isLocked]);

	useEffect(() => {
		setEntities([...boardEntities]);
	}, [boardEntities]);

	return { entities, isLocked, setEntities };
};
