import { isMovable, Vector } from '../../../engine/types/entities';
import { getResolution } from '../../../engine/utils/get-resolution';
import { useBoard } from '../../../game/hooks/use-board';
import { getArrowSymbol } from '../../utils/get-arrow-symbol';
import { Button } from '../button';
import { Icon } from '../icon';
import $$ from './hint.module.css';

export const Hint = () => {
	const { entities, setEntities } = useBoard();

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
				type="button"
				onClick={handleClick}
			>
				<Icon name="hint" />
				Hint
			</Button>
		</div>
	);
};
