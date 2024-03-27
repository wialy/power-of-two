import { Howl, Howler } from 'howler';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MUSIC = {
	game: new Howl({
		loop: true,
		src: ['/sounds/loop-game.m4a'],
	}),
	loose: new Howl({
		src: ['/sounds/loose.m4a'],
	}),
	menu: new Howl({
		loop: true,
		src: ['/sounds/loop-menu.m4a'],
	}),
} as const;

MUSIC.menu.once('unlock', () => {
	MUSIC.menu.play();
});

export type Music = keyof typeof MUSIC;
Howler.autoUnlock = true;

export const useSound = create(
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

				MUSIC.menu.stop();
				MUSIC.game.stop();

				if (music) {
					MUSIC[music].play();
				}

				set({ music });
			},
			toggleMute() {
				const isMuted = !get().isMuted;
				Howler.mute(isMuted);

				set({ isMuted });
			},
		}),
		{
			name: 'sound',
		},
	),
);
