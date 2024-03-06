import { Entity, isDice } from '../../types/entities';

export const getCanMerge = (a: Entity, b: Entity) =>
	isDice(a) && isDice(b) && a.value === b.value && !a.isFresh && !b.isFresh;
