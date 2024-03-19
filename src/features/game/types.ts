export type GameState = {
	episode: string;
	level: string;
	setEpisode: (episode: string) => void;
	setLevel: (level: string) => void;
	screen: ScreenId;
	setScreen: (screen: ScreenId) => void;
	screens: ScreenId[];
};

export type ScreenId = 'episodes' | 'levels' | 'game';
