import { v4 } from 'uuid';

import { Dice, Entity, Floor, Movable } from '../../types/entities';

type Config<T extends Entity> = Partial<Omit<T, 'type'>>;

type ConfigByType = {
	dice: Config<Dice>;
	floor: Config<Floor>;
	movable: Config<Movable>;
};

export type EntityType = keyof ConfigByType;

const DEFAULT_CONFIG: Record<
	keyof ConfigByType,
	() => ConfigByType[keyof ConfigByType]
> = {
	dice: (): ConfigByType['dice'] => ({ value: 0, velocity: { x: 0, y: 0 } }),
	floor: (): ConfigByType['floor'] => ({ base: 'ice' }),
	movable: (): ConfigByType['movable'] => ({ velocity: { x: 0, y: 0 } }),
};

export const createEntity = <T extends keyof ConfigByType>(
	type: T,
	config?: ConfigByType[T],
) =>
	({
		id: config?.id ?? v4(),
		position: config?.position ?? { x: 0, y: 0 },
		type,
		...DEFAULT_CONFIG[type](),
		...config,
	}) as Required<ConfigByType[T]> & { type: T };
