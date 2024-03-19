import { useEpisodes } from '../../../editor/hooks/use-episodes';
import { EpisodeListItem } from '../episode-list-item';
import $$ from './episodes-view.module.css';

export const EpisodesView = () => {
	const { episodes, isLoading } = useEpisodes();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={$$.container}>
			<div className={$$.episodes}>
				{episodes.map((episode) => (
					<EpisodeListItem
						{...episode}
						key={episode.symbols}
					/>
				))}
			</div>
		</div>
	);
};
