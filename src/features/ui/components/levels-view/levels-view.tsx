import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { useGameState } from '../../../game/hooks/use-game-state';
import { useHighscores } from '../../../game/hooks/use-highscores';
import { LevelListItem } from '../level-list-item';
import $$ from './levels-view.module.css';

export const LevelsView = () => {
	const { episode } = useGameState();
	const { isLoading, levels } = useEpisodeLevels({ episode });
	const { highscores } = useHighscores();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={$$.container}>
			<div className={$$.levels}>
				{levels.map((level, index) => {
					const { id } = getParsedLevelRecord(level);
					const highscore = highscores.find(({ levelId }) => levelId === id);

					let isLocked = false;
					if (index > 0) {
						const previousLevel = levels[index - 1];
						const previousLevelId =
							previousLevel && getParsedLevelRecord(previousLevel).id;

						const previousHighscore = highscores.find(
							({ levelId }) => levelId === previousLevelId,
						);

						isLocked = previousHighscore === undefined;
					}

					return (
						<LevelListItem
							key={level}
							highscore={highscore}
							isLocked={isLocked}
							level={getParsedLevelRecord(level)}
						/>
					);
				})}
			</div>
		</div>
	);
};
