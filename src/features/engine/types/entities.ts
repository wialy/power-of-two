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
	// freshly merged dice, to prevent moving into the same position
	isFresh?: boolean;
	// removed from the game, but still visible for the current frame
	isRemoved?: boolean;
	position: Vector;
	type: string; // dice is on the target floor
};

export type Movable = Entity & {
	velocity: Vector;
	isForced?: boolean;
};

export const isMovable = (entity: Pick<Entity, 'type'>): entity is Movable =>
	'velocity' in entity;

export type Floor = Entity & {
	base: 'ice' | 'lava';
	direction?: Vector;
	target?: number;
	type: 'floor';
};

export const isFloor = (entity: Pick<Entity, 'type'>): entity is Floor =>
	entity.type === 'floor';

export type Director = Entity & {
	direction: Vector;
	target: never;
};

export type Target = Entity & {
	target: number;
	direction: never;
};

export const isDirector = (entity: Pick<Entity, 'type'>): entity is Director =>
	isFloor(entity) && 'direction' in entity;

export const isTarget = (entity: Pick<Entity, 'type'>): entity is Target =>
	isFloor(entity) && 'target' in entity;

export type Dice = Movable & {
	type: 'dice';
	value: number;
	isOnTarget?: boolean;
};

export const isDice = (entity: Pick<Entity, 'type'>): entity is Dice =>
	entity.type === 'dice';
