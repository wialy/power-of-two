import { useEffect } from 'react';

import { useGameMusic } from '../use-game-music';
import { useGameSounds } from '../use-game-sounds';
import { useSoundState } from '../use-sound-state';

export const useSounds = () => {
	useGameMusic();
	useGameSounds();

	const { isMuted } = useSoundState();

	useEffect(() => {
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				Howler.mute(true);
			} else {
				Howler.mute(isMuted);
			}
		});
	}, [isMuted]);

	useEffect(() => {
		Howler.mute(isMuted);
	}, [isMuted]);
};
