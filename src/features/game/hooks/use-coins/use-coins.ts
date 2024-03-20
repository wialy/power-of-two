import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCoins = create(
	persist<{
		coins: number;
		addCoins: (coins: number) => void;
		spendCoins: (coins: number) => void;
		lastReward: number;
		reward: (reward: number) => void;
		clearLastReward: () => void;
	}>(
		(set, get) => ({
			addCoins: (coins) => set((state) => ({ coins: state.coins + coins })),
			clearLastReward: () => set({ lastReward: 0 }),
			coins: 0,
			lastReward: 0,
			reward: (reward) => set({ coins: get().coins + reward, lastReward: reward }),
			spendCoins: (coins) => set((state) => ({ coins: state.coins - coins })),
		}),
		{ name: 'coins' },
	),
);
