import { isMovable } from '../../../engine/types/entities';
import { getResolution } from '../../../engine/utils/get-resolution';
import { getResolutionSteps } from '../../../engine/utils/get-resolution-steps';
import { useBoard } from '../../../game/hooks/use-board';
import { useCoins } from '../../../game/hooks/use-coins';
import { Button } from '../button';
import { Icon } from '../icon';
import $$ from './hint.module.css';

const COST = 100;

export const Hint = () => {
	const { entities, setEntities } = useBoard();

	const { coins, spendCoins } = useCoins();

	const resolve = async () => {
		const resolution = await getResolution({ entities });

		if (!resolution) {
			return;
		}

		const resolutionSteps = getResolutionSteps({ resolution });

		const { velocity } = resolutionSteps[0];

		if (!velocity) {
			return;
		}

		spendCoins(COST);
		setEntities((current) =>
			current.map((entity) => {
				if (isMovable(entity)) {
					return {
						...entity,
						isForced: true,
						velocity,
					};
				}

				return entity;
			}),
		);
	};

	const handleClick = () => {
		void resolve();
	};

	return (
		<div className={$$.hint}>
			<Button
				disabled={coins < COST}
				type="button"
				onClick={handleClick}
			>
				<Icon name="hint" /> ${COST}
			</Button>
		</div>
	);
};
