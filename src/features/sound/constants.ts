import { Howl } from 'howler';

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
	win: new Howl({
		src: ['/sounds/win.m4a'],
	}),
} as const;

export const SOUND = {
	click: new Howl({
		src: ['/sounds/click.m4a'],
	}),
	merge: new Howl({
		rate: 1.2,
		src: ['/sounds/merge.m4a'],
	}),
	move: new Howl({
		rate: 0.5,
		src: ['/sounds/move.m4a'],
		volume: 0.5,
	}),
	stop: new Howl({
		src: ['/sounds/stop.m4a'],
	}),
	target: new Howl({
		src: ['/sounds/target.m4a'],
	}),
} as const;
