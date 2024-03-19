import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_RIGHT,
	VECTOR_UP,
	VECTOR_ZERO,
} from '../../../engine/constants';
import { createEntity } from '../../../engine/utils/create-entity';
import { ID_SYMBOLS } from '../../constants';

export const getSymbolEntity = (symbol: string) => {
	if (symbol === ID_SYMBOLS.delimiter) {
		return undefined;
	}

	if (symbol === ID_SYMBOLS.empty) {
		return undefined;
	}

	if (ID_SYMBOLS.floor.includes(symbol)) {
		return createEntity('floor');
	}

	if (ID_SYMBOLS.movable === symbol) {
		return createEntity('movable');
	}

	if (ID_SYMBOLS.dice.includes(symbol)) {
		return createEntity('dice', { value: Number(symbol) });
	}

	if (ID_SYMBOLS.directors.includes(symbol)) {
		return createEntity('floor', {
			direction: [VECTOR_ZERO, VECTOR_DOWN, VECTOR_UP, VECTOR_RIGHT, VECTOR_LEFT][
				ID_SYMBOLS.directors.indexOf(symbol)
			],
		});
	}

	if (ID_SYMBOLS.target.includes(symbol)) {
		return createEntity('floor', {
			target: ID_SYMBOLS.target.indexOf(symbol),
		});
	}
};
