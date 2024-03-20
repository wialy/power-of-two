import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity, isDice, isMovable } from '../../../engine/types/entities';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import { useBoard } from '../use-board';
import { useGameState } from '../use-game-state';
import { useHighscores } from '../use-highscores';
import { useGameAnimation } from './use-game-animation';

const getSortedMovables = (entities: Entity[]) =>
	entities
		.filter(isMovable)
		.map(({ id, position }) => ({ id, position }))
		.sort((a, b) => (a.id > b.id ? 1 : -1));

const getSnapshot = (entities: Entity[]) =>
	JSON.stringify(getSortedMovables(entities));

export const useGame = ({ disabled }: { disabled?: boolean }) => {
	const { countMove, level, moves, setScreen } = useGameState();
	const { save } = useHighscores();

	// const [entities, setEntities] = useState<Entity[]>([...boardEntities]);
	const { entities, setEntities } = useBoard();
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
	}, [animate, countMove, disabled, isAnimating, isLocked, setEntities]);

	const showWinScreen = useDebouncedCallback(() => {
		setScreen('won');
		save({ levelId: level, moves: moves + 1 });
	}, 500);

	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (isComplete) {
			return;
		}

		if (disabled) {
			return;
		}

		if (entities.length === 0) {
			return;
		}

		const dices = entities.filter(isDice);
		const isAnyMoving = dices.some(
			(dice) => !getIsSameVector(dice.velocity, VECTOR_ZERO),
		);

		if (isAnyMoving) {
			return;
		}

		const allOnTarget = dices.every((dice) => dice.isOnTarget);

		if (allOnTarget) {
			setIsComplete(true);
			showWinScreen();
		}
	}, [disabled, entities, isComplete, showWinScreen]);

	useEffect(() => {
		setIsComplete(false);
	}, [entities]);

	return { entities, isLocked };
};
