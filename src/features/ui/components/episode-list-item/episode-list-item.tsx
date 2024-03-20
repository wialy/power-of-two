import { ID_SYMBOLS } from '../../../editor/constants';
import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { EpisodeRecord } from '../../../editor/types';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { getSymbolEntity } from '../../../editor/utils/get-symbol-entity';
import { Entity } from '../../../engine/types/entities';
import { useGameState } from '../../../game/hooks/use-game-state';
import { useHighscores } from '../../../game/hooks/use-highscores';
import { TILE_SIZE } from '../../constants';
import { EntityView } from '../entity-view';
import { Icon } from '../icon';
import $$ from './episode-list-item.module.css';

const SCALE = 0.3;

export const EpisodeListItem = ({ name, symbols }: EpisodeRecord) => {
	const { setEpisode, setScreen } = useGameState();
	const { highscores } = useHighscores();

	const { levels } = useEpisodeLevels({ episode: symbols });

	const levelsData = Object.fromEntries(
		levels.map((level) => {
			const { id, ...data } = getParsedLevelRecord(level);

			return [id, data];
		}),
	);

	let completeAmount = 0;
	let proAmount = 0;
	for (const [id, level] of Object.entries(levelsData)) {
		const highscore = highscores.find(({ levelId }) => levelId === id);
		if (highscore) {
			completeAmount++;

			if (highscore.moves <= level.steps) {
				proAmount++;
			}
		}
	}

	const entities = [...symbols]
		.filter((symbol) => ![ID_SYMBOLS.floor].includes(symbol))
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

			<div className={$$.description}>
				<Icon name="complete" />
				{completeAmount} of {levels.length}
				<div>&nbsp;</div>
				<Icon name="pro" />
				{proAmount}
			</div>
		</button>
	);
};
