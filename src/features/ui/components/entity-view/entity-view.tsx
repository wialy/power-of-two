import { useEffect, useMemo, useRef, useState } from 'react';

import {
	Entity,
	isDice,
	isFloor,
	isMovable,
	Movable,
} from '../../../engine/types/entities';
import { getClone } from '../../../engine/utils/get-clone';
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
const FLOOR_COLOR = 'rgba(255,255,255,0.1)';
const DIRECTION_COLOR = 'rgba(255,255,255,0.4)';

const getColor = (value: number) =>
	DICE_COLORS[Math.min(value, DICE_COLORS.length - 1)];

const getBackgroundColor = (entity: Entity) => {
	if (isDice(entity)) {
		return entity.isRemoved ? getColor(entity.value + 1) : getColor(entity.value);
	}

	if (isFloor(entity)) {
		return FLOOR_COLOR;
	}

	return '#FFFFFF';
};

const getScales = (entity: Entity): [number, number] => {
	if (entity.isRemoved) return [0, 0];
	if (entity.isFresh) return [1.1, 1.1];
	if (isMovable(entity) && entity.velocity.x !== 0) return [1.02, 0.98];
	if (isMovable(entity) && entity.velocity.y !== 0) return [0.98, 1.02];

	return [1, 1];
};

const getBoxShadow = (entity: Entity) => {
	if (isFloor(entity)) {
		if (entity.target !== undefined) {
			return `inset 0 0 0 2px ${getColor(entity.target)}`;
		} else if (entity.direction) {
			return `inset 0 0 0 2px ${DIRECTION_COLOR}`;
		}
	} else if (isMovable(entity)) {
		if (isDice(entity) && entity.isOnTarget) {
			return `inset 0 ${-TILE_SIZE / 10}px 0 rgba(0,0,0,0.05), 0 0 ${TILE_SIZE / 2}px ${getColor(entity.value)}`;
		}

		return `inset 0 ${-TILE_SIZE / 10}px 0 rgba(0,0,0,0.05), 0.25vw 0.2vw 0 0 rgba(0,0,0,0.1)`;
	}

	return undefined;
};

const getSymbol = (entity: Entity) => {
	if (isDice(entity)) return 2 ** entity.value;
	if (isFloor(entity) && entity.direction)
		return getArrowSymbol(entity.direction);
	if (isFloor(entity) && entity.target !== undefined) return 2 ** entity.target;

	return null;
};

const getSymbolColor = (entity: Entity) => {
	if (isFloor(entity) && entity.target !== undefined)
		return getColor(entity.target);
	if (isDice(entity)) return 'white';

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

	const { isRemoved } = entity;

	const previousPosition = useRef(entity.position);

	useEffect(() => {
		if (!getIsSameVector(entity.position, previousPosition.current)) {
			previousPosition.current = getClone(entity.position);
		}
	}, [entity]);

	const velocity = useMemo(
		() => ({
			x: entity.position.x - previousPosition.current.x,
			y: entity.position.y - previousPosition.current.y,
		}),
		[entity],
	);

	const [scaleX, scaleY] = getScales({ ...entity, velocity } as Movable);

	const size = isMovable(entity) ? TILE_SIZE - 12 : TILE_SIZE - 2;

	const borderRadius = isMovable(entity) ? '20%' : '22%';

	const boxShadow = getBoxShadow(entity);

	const symbol = getSymbol(entity);
	const symbolColor = getSymbolColor(entity);

	let transform = `translate(${entity.position.x * TILE_SIZE}px, ${
		entity.position.y * TILE_SIZE
	}px)`;

	if (scale !== undefined) {
		transform += ` scale(${scale})`;
	}

	return (
		<div
			className={$$.entity}
			style={{
				transform,
				transitionDuration: `${Number(MOVE_DURATION)}ms`,
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
					transform: `translate(${-size / 2}px, ${
						-size / 2
					}px) scaleX(${scaleX}) scaleY(${scaleY}) translate(${velocity.x * 10}%, ${velocity.y * 10}%)`,
					transitionDuration: `${MOVE_DURATION * 2}ms`,
					width: size,
				}}
			>
				{Boolean(symbol) && (
					<span
						className="symbol"
						style={{
							color: symbolColor,
							textShadow: `0 ${-TILE_SIZE / 30}px rgba(0,0,0,0.05)`,
							transform:
								isMovable(entity) && (velocity.x !== 0 || velocity.y !== 0)
									? `translate(${(velocity.x * TILE_SIZE) / 8}px, ${
											(velocity.y * TILE_SIZE) / 8
										}px)`
									: `translate(0, 0) scale(${isAdded && !isRemoved ? 1 : 0})`,
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
