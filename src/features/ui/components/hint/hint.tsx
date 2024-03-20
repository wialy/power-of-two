import { isMovable, Vector } from '../../../engine/types/entities';
import { getResolution } from '../../../engine/utils/get-resolution';
import { useBoard } from '../../../game/hooks/use-board';
import { useCoins } from '../../../game/hooks/use-coins';
import { getArrowSymbol } from '../../utils/get-arrow-symbol';
import { Button } from '../button';
import { Icon } from '../icon';
import $$ from './hint.module.css';

const COST = 100;

export const Hint = () => {
	const { entities, setEntities } = useBoard();

	const { coins, spendCoins } = useCoins();

	const resolve = async () => {
		let resolution = await getResolution({ entities });
		let velocity: Vector | undefined;

		let symbols = '';

		while (resolution?.previous !== undefined) {
			if (resolution.velocity !== undefined) {
				symbols = getArrowSymbol(resolution.velocity) + symbols;
				({ velocity } = resolution);
			}

			resolution = resolution.previous;
		}

		if (velocity) {
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
		}
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
