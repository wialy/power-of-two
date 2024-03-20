import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { VECTOR_ZERO } from '../../../engine/constants';
import { Entity, isDice, isMovable } from '../../../engine/types/entities';
import { getReward } from '../../utils';
import { useBoard } from '../use-board';
import { useCoins } from '../use-coins';
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
	const { countMove, level, maxMoves, moves, setScreen } = useGameState();
	const { highscores, save } = useHighscores();
	const { reward } = useCoins();

	const { entities, setEntities } = useBoard();
	const [isLocked, setIsLocked] = useState(false);
	const isMounted = useRef(false);

	const { animate, isAnimating } = useGameAnimation({
		disabled: disabled || !isMounted.current,
		entities,
		setEntities,
	});

	const highscore = highscores.find(({ levelId }) => levelId === level);

	const showWinScreen = useDebouncedCallback(() => {
		setScreen('won');

		const currentReward = getReward({ maxMoves, moves });
		const previousReward = highscore?.moves
			? getReward({ maxMoves, moves: highscore.moves })
			: 0;

		const amount = Math.max(currentReward - previousReward, 0);
		reward(amount);

		save({ levelId: level, moves });
	}, 500);

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

						if (result.length > 0) {
							const dices = result.filter(isDice);

							const allOnTarget = dices.every((dice) => dice.isOnTarget);

							if (allOnTarget) {
								showWinScreen();
							} else {
								setIsLocked(false);
							}
						}
					} else {
						setIsLocked(false);
					}

					return result;
				});
			})();
		}
	}, [
		animate,
		countMove,
		disabled,
		entities,
		isAnimating,
		isLocked,
		setEntities,
		showWinScreen,
	]);

	return { isLocked };
};
