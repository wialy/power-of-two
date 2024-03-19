import { Entity, isMovable } from '../../../engine/types/entities';
import { createEntity } from '../../../engine/utils/create-entity';
import { getClone } from '../../../engine/utils/get-clone';
import { ID_SYMBOLS } from '../../constants';
import { getSymbolEntity } from '../get-symbol-entity';

export const getIdEntities = (id: string) => {
	const rows = id.split(ID_SYMBOLS.delimiter);

	const result: Entity[] = [];

	for (const [y, row] of rows.entries()) {
		const symbols = [...row];
		for (const [x, symbol] of symbols.entries()) {
			const entity = getSymbolEntity(symbol);
			if (!entity) continue;

			entity.position = {
				x,
				y,
			};

			result.push(entity);

			if (isMovable(entity)) {
				result.push(createEntity('floor', { position: getClone(entity.position) }));
			}
		}
	}

	return result;
};
