import { useEffect, useState } from 'react';

import { EpisodeRecord } from '../../types';

export const useEpisodes = () => {
	const [episodes, setEpisodes] = useState<EpisodeRecord[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setIsLoading(true);
			const response = await fetch('/levels/episodes.json');
			const data = (await response.json()) as EpisodeRecord[];
			setEpisodes(data);
			setIsLoading(false);
		};

		void load();
	}, []);

	return { episodes, isLoading };
};
