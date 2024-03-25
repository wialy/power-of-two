import { useEffect, useState } from 'react';

import { VECTOR_ZERO } from '../../../engine/constants';
import {
	Entity,
	isDice,
	isFloor,
	isMovable,
	Movable,
} from '../../../engine/types/entities';
import { getIsSameVector } from '../../../engine/utils/get-is-same-vector';
import { MOVE_DURATION, TILE_SIZE } from '../../constants';
import { getArrowSymbol } from '../../utils/get-arrow-symbol';
import $$ from './entity-view.module.css';

const DICE_COLORS = [
	'#FF851B', //1
	'#FFDC00', //2
	'#2ECC40', //4
	'#39CCCC', //8
	'#0074D9', //16
	'#B10DC9', //32
	'#FF4136', //64
];
const FLOOR_COLOR = 'rgba(255,255,255,0.05)';
const DIRECTION_COLOR = 'rgba(255,255,255,0.4)';
const MOVABLE_COLOR = '#DADEDF';
const DEFORMATION_FACTOR = 0.05;

const getColor = (value: number) =>
	DICE_COLORS[Math.min(value, DICE_COLORS.length - 1)];

const getBackgroundColor = (entity: Entity) => {
	if (isDice(entity)) {
		return entity.isRemoved ? getColor(entity.value + 1) : getColor(entity.value);
	}

	if (isFloor(entity)) {
		return FLOOR_COLOR;
	}

	return MOVABLE_COLOR;
};

const getScales = (entity: Entity): [number, number] => {
	if (entity.isRemoved) return [0, 0];
	if (entity.isFresh) return [1.1, 1.1];

	if (isMovable(entity) && entity.velocity.x !== 0)
		return [1 + DEFORMATION_FACTOR, 1 - DEFORMATION_FACTOR];
	if (isMovable(entity) && entity.velocity.y !== 0)
		return [1 - DEFORMATION_FACTOR, 1 + DEFORMATION_FACTOR];

	return [1, 1];
};

const getBoxShadow = (entity: Entity) => {
	if (isFloor(entity)) {
		if (entity.target !== undefined) {
			return `inset 0 0 0 2px ${getColor(entity.target)}`;
		} else if (entity.direction) {
			return `inset 0 0 0 2px ${DIRECTION_COLOR}`;
		}

		return undefined;
	}

	if (isDice(entity)) {
		return entity.isOnTarget
			? `inset 0 0 1vw rgba(255,255,255,0.125), inset 0 0 0 transparent, 0 0 ${TILE_SIZE / 2}px ${getColor(entity.value)}`
			: `inset 0 0 1vw ${getColor(entity.value)}, inset 0 ${-TILE_SIZE / 16}px 0 rgba(0,0,0,0.2), inset 0 0 0 transparent`;
	}

	return `inset 0 0 ${TILE_SIZE / 2}px ${MOVABLE_COLOR}, inset 0 ${-TILE_SIZE / 16}px 0 rgba(0,0,0,0.2)`;
};

const getSymbol = (entity: Entity) => {
	if (isDice(entity)) return 2 ** entity.value;
	if (isFloor(entity) && entity.direction)
		return getArrowSymbol(entity.direction);
	if (isFloor(entity) && entity.target !== undefined) return 2 ** entity.target;
	if (isMovable(entity)) return '○';

	return null;
};

const getSymbolColor = (entity: Entity) => {
	if (isFloor(entity) && entity.target !== undefined)
		return getColor(entity.target);
	if (isDice(entity)) return 'white';
	if (isMovable(entity)) return '#FAFAFA';

	return DIRECTION_COLOR;
};

export const EntityView = ({
	entity,
	scale,
}: {
	entity: Entity;
	scale?: number;
}) => {
	const [isAdded, setIsAdded] = useState(false);

	const backgroundColor = getBackgroundColor(entity);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsAdded(true);
		}, 0);

		return () => clearTimeout(timeout);
	}, []);

	const velocity = isMovable(entity) ? entity.velocity : VECTOR_ZERO;

	const [scaleX, scaleY] = getScales({
		...entity,
		velocity,
	} as Movable);

	const size = isMovable(entity) ? TILE_SIZE - 12 : TILE_SIZE - 2;

	const borderRadius = isMovable(entity) ? '20%' : '22%';

	const boxShadow = getBoxShadow(entity);

	const symbol = getSymbol(entity);
	const symbolColor = getSymbolColor(entity);

	let transform = `translate(${entity.position.x * TILE_SIZE * (scale ?? 1)}px, ${
		entity.position.y * TILE_SIZE * (scale ?? 1)
	}px)`;

	if (scale !== undefined) {
		transform += ` scale(${scale})`;
	}

	return (
		<div
			className={$$.entity}
			style={{
				transform,
				transitionDuration: `${Number(MOVE_DURATION * 1.05)}ms`,
				willChange: isMovable(entity) ? 'transform' : undefined,
			}}
		>
			<div
				className={$$.background}
				style={{
					backgroundColor,
					borderRadius,
					boxShadow,
					fontSize: TILE_SIZE / 2.5,
					height: size,
					transform: `translate(${-size / 2}px, ${-size / 2}px) scale(${scaleX}, ${scaleY})`,
					transitionDuration: `${Number(MOVE_DURATION * 3)}ms`,
					width: size,
				}}
			>
				{Boolean(symbol) && (
					<span
						className={$$.symbol}
						style={{
							color: symbolColor,
							textShadow: `0 -1px 0 rgba(0,0,0,0.1)`,
							transform:
								isMovable(entity) &&
								(getIsSameVector(velocity, VECTOR_ZERO) || entity.isRemoved)
									? `translate(0, 0) scale(${isAdded ? 1 : 0})`
									: `translate(${velocity.x * TILE_SIZE * 0.1}px, ${
											velocity.y * TILE_SIZE * 0.1
										}px)`,
							transitionDuration: `${MOVE_DURATION * 2}ms`,
						}}
					>
						{symbol}
					</span>
				)}
			</div>
		</div>
	);
};
