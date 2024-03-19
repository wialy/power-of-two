export type GameState = {
	episode: string;
	level: string;
	setEpisode: (episode: string) => void;
	setLevel: (level: string) => void;
};
