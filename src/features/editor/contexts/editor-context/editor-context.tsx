import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { Entity } from '../../../engine/types/entities';
import { Level } from '../../../engine/types/game';
import { createEntity, EntityType } from '../../../engine/utils/create-entity';
import { ENTITIES } from '../../constants';
import { createLevel } from '../../utils/create-level';
import { getLevelId } from '../../utils/get-level-id';

type EntityRecord = { entity: Entity; quantity: number };

const editorContext = createContext<{
	seed: number;
	setSeed: (seed: number) => void;
	entities: EntityRecord[];
	setEntities: (entities: EntityRecord[]) => void;
	level: Level;
}>({
	entities: [],
	level: { entities: [], id: '' },
	seed: 0,
	setEntities() {},
	setSeed() {},
});

export const EditorContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [seed, setSeed] = useState(0);

	const [entities, setEntities] = useState<EntityRecord[]>(
		ENTITIES.map((entity) => ({
			entity,
			quantity: 0,
		})),
	);

	const level = useMemo(() => {
		const availableEntities = entities.flatMap(
			({ entity: { id, type, ...config }, quantity }) =>
				Array.from({ length: quantity }).map(() =>
					createEntity(type as EntityType, config),
				),
		);

		const levelEntities =
			createLevel({
				entities: availableEntities,
				seed,
			}) ?? [];

		return {
			entities: levelEntities,
			id: getLevelId({ entities: levelEntities }),
		};
	}, [entities, seed]);

	return (
		<editorContext.Provider
			value={{ entities, level, seed, setEntities, setSeed }}
		>
			{children}
		</editorContext.Provider>
	);
};

export const useEditorContext = () => useContext(editorContext);
