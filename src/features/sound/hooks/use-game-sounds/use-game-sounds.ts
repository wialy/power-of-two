import { useEffect, useState } from 'react';

import { VECTOR_ZERO } from '../../../engine/constants';
import { getGroupedByType } from '../../../engine/utils/get-grouped-by-type';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import { useBoard } from '../../../game/hooks/use-board';
import { useGameState } from '../../../game/hooks/use-game-state';
import { SOUND } from '../../constants';

export const useGameSounds = () => {
	const { level } = useGameState();
	const { entities } = useBoard();

	const [previousEntities, setPreviousEntities] = useState(entities);

	useEffect(() => {
		setPreviousEntities(entities);
	}, [entities]);

	useEffect(() => {
		setPreviousEntities([]);
	}, [level]);

	useEffect(() => {
		const { dices: previousDices, movables: previousMovables } = getGroupedByType(
			{
				entities: previousEntities,
			},
		);

		const allPreviousMovables = [...previousDices, ...previousMovables];

		if (allPreviousMovables.length === 0) {
			return;
		}

		const { dices, movables } = getGroupedByType({
			entities,
		});

		const allCurrentMovables = [...dices, ...movables];

		const hasAnyStartedMoving = allCurrentMovables.some((current) =>
			allPreviousMovables.some(
				(previous) =>
					current.id === previous.id &&
					!getIsSameVector(current.velocity, previous.velocity) &&
					!getIsSameVector(current.velocity, VECTOR_ZERO),
			),
		);

		if (hasAnyStartedMoving) {
			SOUND.move.play();
		}

		const hasValueIncreased = dices.some(({ id, value }) => {
			const previousDice = previousDices.find(
				({ id: previousId }) => id === previousId,
			);

			if (!previousDice) {
				return false;
			}

			return previousDice.value < value;
		});

		if (hasValueIncreased) {
			SOUND.merge.play();
		}

		const previousDicesOnTarget = previousDices.filter(
			({ isOnTarget }) => isOnTarget,
		);
		const currentDicesOnTarget = dices.filter(({ isOnTarget }) => isOnTarget);

		const isNewDiceOnTarget = currentDicesOnTarget.some(
			({ id }) =>
				!previousDicesOnTarget.some(({ id: previousId }) => id === previousId),
		);

		if (isNewDiceOnTarget) {
			SOUND.target.play();
		}
	}, [entities, previousEntities]);
};
