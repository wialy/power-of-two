import clsx from 'clsx';

import {
	Entity,
	isDice,
	isFloor,
	isMovable,
} from '../../../engine/types/entities';
import { getArrowSymbol } from '../../utils/get-arrow-symbol';
import $$ from './entity-preview.module.css';

export const EntityPreview = ({ entity }: { entity?: Entity }) => {
	if (!entity) {
		return <div className={clsx($$.container)} />;
	}

	if (isDice(entity)) {
		const { value } = entity;

		return (
			<div className={clsx($$.container, $$[`dice${value}`])}>{2 ** value}</div>
		);
	}

	if (isMovable(entity)) {
		return <div className={clsx($$.container, $$.movable)} />;
	}

	if (isFloor(entity)) {
		if (entity.target !== undefined) {
			return (
				<div
					className={clsx(
						$$.container,
						$$.floor,
						$$.target,
						$$[`target${entity.target}`],
					)}
				>
					{2 ** entity.target}
				</div>
			);
		} else if (entity.direction !== undefined) {
			return (
				<div className={clsx($$.container, $$.floor, $$.director)}>
					{getArrowSymbol(entity.direction)}
				</div>
			);
		}

		return <div className={clsx($$.container, $$.floor)} />;
	}

	return <div className={clsx($$.container)}>X</div>;
};
