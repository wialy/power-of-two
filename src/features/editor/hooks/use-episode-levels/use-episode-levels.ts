import { useEffect, useMemo, useState } from 'react';

import { SerializedLevelRecord } from '../../types';
import { useEpisodes } from '../use-episodes';

export const useEpisodeLevels = ({ episode }: { episode: string }) => {
	const { episodes } = useEpisodes();
	const [levels, setLevels] = useState<SerializedLevelRecord[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const currentEpisode = useMemo(
		() => episodes.find(({ symbols }) => symbols === episode),
		[episodes, episode],
	);

	useEffect(() => {
		const load = async () => {
			if (!currentEpisode) {
				return;
			}

			setIsLoading(true);
			const response = await fetch(`/levels/${currentEpisode?.symbols}.json`);
			const data = (await response.json()) as SerializedLevelRecord[];
			setLevels(data);
			setIsLoading(false);
		};

		void load();
	}, [currentEpisode]);

	return { isLoading, levels };
};
