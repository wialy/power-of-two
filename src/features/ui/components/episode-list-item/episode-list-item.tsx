import { EpisodeRecord } from '../../../editor/types';
import { useGameState } from '../../../game/hooks/use-game-state';
import $$ from './episode-list-item.module.css';

export const EpisodeListItem = ({ levels, name, symbols }: EpisodeRecord) => {
	const { setEpisode } = useGameState();

	return (
		<button
			className={$$.container}
			onClick={() => setEpisode(symbols)}
		>
			<div className={$$.name}>{name}</div>
			<div className={$$.description}>{levels} levels</div>
		</button>
	);
};
