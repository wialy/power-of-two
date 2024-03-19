export type GameState = {
	episode: string;
	level: string;
	setEpisode: (episode: string) => void;
	setLevel: (level: string) => void;
	screen: ScreenId;
	setScreen: (screen: ScreenId) => void;
	screens: ScreenId[];
	restart: () => void;
	moves: number;
	setMoves: (moves: number) => void;
	countMove: () => void;
	maxMoves: number;
	setMaxMoves: (maxMoves: number) => void;
};

export type ScreenId =
	| 'episodes'
	| 'levels'
	| 'game'
	| 'won'
	| 'lost'
	| 'title';

export type Highscore = {
	levelId: string;
	moves: number;
};
