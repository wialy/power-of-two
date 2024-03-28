import { useEffect } from 'react';

import { useGameMusic } from '../use-game-music';
import { useGameSounds } from '../use-game-sounds';
import { useSoundState } from '../use-sound-state';

export const useSounds = () => {
	useGameMusic();
	useGameSounds();

	const { isMuted } = useSoundState();

	useEffect(() => {
		Howler.mute(isMuted);
	}, [isMuted]);
};
