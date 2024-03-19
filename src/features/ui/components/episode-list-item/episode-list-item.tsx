import { ID_SYMBOLS } from '../../../editor/constants';
import { EpisodeRecord } from '../../../editor/types';
import { getSymbolEntity } from '../../../editor/utils/get-symbol-entity';
import { Entity } from '../../../engine/types/entities';
import { useGameState } from '../../../game/hooks/use-game-state';
import { TILE_SIZE } from '../../constants';
import { EntityView } from '../entity-view';
import $$ from './episode-list-item.module.css';

const SCALE = 0.3;

export const EpisodeListItem = ({ levels, name, symbols }: EpisodeRecord) => {
	const { setEpisode, setScreen } = useGameState();

	const entities = [...symbols]
		.filter(
			(symbol) => symbol !== ID_SYMBOLS.floor && symbol !== ID_SYMBOLS.empty,
		)
		.map((symbol) => getSymbolEntity(symbol))
		.filter(Boolean)
		.map((entity, index) => ({
			...entity,
			position: { x: index, y: 0 },
		})) as Entity[];

	return (
		<button
			className={$$.container}
			onClick={() => {
				setEpisode(symbols);
				setScreen('levels');
			}}
		>
			<div className={$$.name}>{name}</div>
			<div className={$$.description}>{levels} levels</div>
			<div className={$$.symbols}>
				<div
					style={{
						position: 'relative',
						width: entities.length * TILE_SIZE * SCALE,
					}}
				>
					{entities.map((entity) => {
						if (!entity) return null;

						return (
							<EntityView
								key={entity.id}
								entity={entity}
								scale={SCALE}
							/>
						);
					})}
				</div>
			</div>
		</button>
	);
};
