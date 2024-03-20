import { create } from 'zustand';

import { Entity } from '../../../engine/types/entities';

type SetEntitiesArgument = Entity[] | ((value: Entity[]) => Entity[]);

export type SetEntities = (value: SetEntitiesArgument) => void;

export const useBoard = create<{
	entities: Entity[];
	setEntities: SetEntities;
}>((set) => ({
	entities: [],
	setEntities(value: SetEntitiesArgument) {
		if (typeof value === 'function') {
			set((state) => ({
				entities: value(state.entities),
			}));
		} else {
			set({
				entities: value,
			});
		}
	},
}));
