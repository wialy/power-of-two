import { useEffect } from 'react';

import { useGameState } from '../../../game/hooks/use-game-state';
import { ScreenId } from '../../../game/types';
import { SOUND } from '../../constants';
import { Music } from '../../types';
import { useSoundState } from '../use-sound-state';

const MUSIC_MAP: Record<Music, ScreenId[]> = {
	game: ['game'],
	loose: ['lost', 'unsolvable'],
	menu: ['title', 'episodes', 'levels'],
	win: ['won'],
};

export const useGameMusic = () => {
	const { screen } = useGameState();
	const { setMusic } = useSoundState();

	useEffect(() => {
		const music = Object.keys(MUSIC_MAP).find((key) =>
			MUSIC_MAP[key as Music].includes(screen),
		) as Music | undefined;

		setMusic(music);

		SOUND.stop.play();
	}, [screen, setMusic]);
};
