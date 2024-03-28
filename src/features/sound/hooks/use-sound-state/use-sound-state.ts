import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MUSIC } from '../../constants';
import { Music } from '../../types';

export const useSoundState = create(
	persist<{
		isMuted: boolean;
		toggleMute: () => void;
		music?: Music;
		setMusic: (music?: Music) => void;
	}>(
		(set, get) => ({
			isMuted: false,
			music: undefined,
			setMusic(music) {
				if (get().music === music) return;

				for (const key in MUSIC) {
					MUSIC[key as Music].stop();
				}

				if (music) {
					MUSIC[music].play();
				}

				set({ music });
			},
			toggleMute() {
				const isMuted = !get().isMuted;

				set({ isMuted });
			},
		}),
		{
			name: 'sound',
			partialize: ({ music, ...rest }) => ({ music: undefined, ...rest }),
		},
	),
);
