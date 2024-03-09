import { useEffect, useRef, useState } from 'react';

import { VECTOR_ZERO } from '../../engine/constants';
import { Entity, isMovable } from '../../engine/types/entities';
import { Level } from '../../engine/types/game';
import { useGameAnimation } from './use-game-animation';

export const useGame = ({
	disabled,
	level: { entities: boardEntities },
}: {
	disabled?: boolean;
	level: Level;
}) => {
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

	useEffect(() => {
		// react to forced movable entities
		const hasForcedEntity = entities
			.filter(isMovable)
			.some((entity) => entity.isForced);

		if (hasForcedEntity) {
			setIsLocked(true);
		}
	}, [entities, isLocked]);

	useEffect(() => {
		if (disabled) {
			return;
		}

		if (isLocked && !isAnimating) {
			void (async () => {
				await animate();

				setEntities((current) =>
					current.map((entity) =>
						isMovable(entity)
							? {
									...entity,
									isForced: false,
									isFresh: false,
									velocity: VECTOR_ZERO,
								}
							: entity,
					),
				);

				setIsLocked(false);
			})();
		}
	}, [animate, disabled, isAnimating, isLocked]);

	useEffect(() => {
		setEntities([...boardEntities]);
	}, [boardEntities]);

	return { entities, isLocked, setEntities };
};
