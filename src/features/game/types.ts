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
	phase: GamePhase;
	setPhase: (phase: GamePhase) => void;
};

export type ScreenId = 'episodes' | 'levels' | 'game' | 'won' | 'lost';

export type GamePhase = 'playing' | 'won' | 'lost';
