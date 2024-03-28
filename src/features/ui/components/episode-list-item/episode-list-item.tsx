import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { EpisodeRecord } from '../../../editor/types';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { getSymbolEntity } from '../../../editor/utils/get-symbol-entity';
import { Entity } from '../../../engine/types/entities';
import { useGameState } from '../../../game/hooks/use-game-state';
import { useHighscores } from '../../../game/hooks/use-highscores';
import { SOUND } from '../../../sound/constants';
import { AnimatedText } from '../animated-text';
import { EntityPreview } from '../entity-preview/entity-preview';
import { Icon } from '../icon';
import $$ from './episode-list-item.module.css';

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

	const entities = [...symbols].map((symbol) =>
		getSymbolEntity(symbol),
	) as Entity[];

	const handleClick = () => {
		setEpisode(symbols);
		setScreen('levels');

		SOUND.click.play();
	};

	return (
		<button
			className={$$.container}
			onClick={handleClick}
		>
			<div className={$$.name}>
				<AnimatedText>{name}</AnimatedText>
			</div>

			<div className={$$.symbols}>
				{entities.map((entity, index) => (
					<EntityPreview
						key={index}
						entity={entity}
					/>
				))}
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
