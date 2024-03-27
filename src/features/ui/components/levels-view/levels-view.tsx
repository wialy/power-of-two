import { useCallback, useMemo } from 'react';

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

	const parsedLevels = useMemo(() => levels.map(getParsedLevelRecord), [levels]);

	const getHighscore = useCallback(
		(levelId: string) => highscores.find(({ levelId: id }) => id === levelId),
		[highscores],
	);

	// sort by highscore and levels steps
	const sortedLevels = useMemo(
		() =>
			parsedLevels.sort((a, b) => {
				const highscoreA = getHighscore(a.id);
				const highscoreB = getHighscore(b.id);

				const stepsA = a.steps;
				const stepsB = b.steps;

				if ((highscoreA && highscoreB) || (!highscoreA && !highscoreB)) {
					return stepsA - stepsB;
				} else if (highscoreA) {
					return -1;
				}

				return 1;
			}),

		[getHighscore, parsedLevels],
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={$$.container}>
			<div className={$$.levels}>
				{sortedLevels.map((level, index) => {
					const { id } = level;
					const highscore = getHighscore(id);

					let isLocked = false;
					if (index > 0) {
						const previousLevel = sortedLevels[index - 1];
						const previousHighscore = getHighscore(previousLevel.id);

						isLocked = previousHighscore === undefined;
					}

					return (
						<LevelListItem
							key={id}
							highscore={highscore}
							isLocked={isLocked}
							level={level}
						/>
					);
				})}
			</div>
		</div>
	);
};
