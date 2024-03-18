import { useCallback, useEffect } from 'react';
import { SwipeDirections, useSwipeable } from 'react-swipeable';

import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
} from '../../../engine/constants';
import { Entity, isMovable, Vector } from '../../../engine/types/entities';

const KEY_TO_VELOCITY_VECTOR: Record<string, Vector> = {
	ArrowDown: VECTOR_DOWN,
	ArrowLeft: VECTOR_LEFT,
	ArrowRight: VECTOR_RIGHT,
	ArrowUp: VECTOR_UP,
};

const SWIPE_TO_VELOCITY_VECTOR: Record<SwipeDirections, Vector> = {
	Down: VECTOR_DOWN,
	Left: VECTOR_LEFT,
	Right: VECTOR_RIGHT,
	Up: VECTOR_UP,
};

export const useControls = ({
	disabled,
	setEntities,
}: {
	disabled?: boolean;
	setEntities: (function_: (entities: Entity[]) => Entity[]) => void;
}) => {
	const applyVelocity = useCallback(
		(velocity?: { x: number; y: number }) => {
			if (!velocity) return;

			setEntities((entities) =>
				entities.map((entity) =>
					isMovable(entity)
						? {
								...entity,
								isForced: true,
								isFresh: false,
								velocity: { ...velocity },
							}
						: entity,
				),
			);
		},
		[setEntities],
	);

	useEffect(() => {
		if (disabled) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			applyVelocity(KEY_TO_VELOCITY_VECTOR[event.key]);
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [applyVelocity, disabled]);

	const swipeProperties = useSwipeable({
		onSwiped({ dir }) {
			applyVelocity(SWIPE_TO_VELOCITY_VECTOR[dir]);
		},
		trackMouse: true,
		trackTouch: true,
	});

	return { swipeProps: swipeProperties };
};
