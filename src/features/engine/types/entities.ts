export type Vector = {
	x: number;
	y: number;
};

export const getIsVector = (value: unknown): value is Vector => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const keys = Object.keys(value);
	if (keys.length !== 2) {
		return false;
	}

	return 'x' in value && 'y' in value;
};

export type Entity = {
	id: string;
	// removed from the game, but still visible for the current frame
	isFresh?: boolean;
	// freshly merged dice, to prevent moving into the same position
	isOnTarget?: boolean;
	isRemoved?: boolean;
	position: Vector;
	type: string; // dice is on the target floor
};

export type Movable = Entity & {
	velocity: Vector;
};

export const isMovable = (entity: Entity): entity is Movable =>
	'velocity' in entity;

export type Floor = Entity & {
	base: 'ice' | 'lava';
	direction?: Vector;
	target?: number;
	type: 'floor';
};

export const isFloor = (entity: Entity): entity is Floor =>
	entity.type === 'floor';

export type Dice = Movable & {
	type: 'dice';
	value: number;
};

export const isDice = (entity: Entity): entity is Dice =>
	entity.type === 'dice';
