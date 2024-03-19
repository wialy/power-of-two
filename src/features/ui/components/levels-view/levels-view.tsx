import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { LevelListItem } from '../level-list-item';
import $$ from './levels-view.module.css';

export const LevelsView = () => {
	const { isLoading, levels } = useEpisodeLevels();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={$$.container}>
			<div className={$$.levels}>
				{levels.map((level) => (
					<LevelListItem
						key={level}
						level={getParsedLevelRecord(level)}
					/>
				))}
			</div>
		</div>
	);
};
