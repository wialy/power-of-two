import { useEffect } from 'react';

import { getIdEntities } from '../../../editor/utils/get-id-entities';
import { useBoard } from '../../../game/hooks/use-board';
import { useCoins } from '../../../game/hooks/use-coins';
import { useControls } from '../../../game/hooks/use-controls';
import { useGame } from '../../../game/hooks/use-game';
import { useGameState } from '../../../game/hooks/use-game-state';
import { BoardView } from '../board-view';
import { Hint } from '../hint';
import { useScreen } from '../screen/screen-provider';
import { SwipeArea } from '../swipe-area';

export const GameView = () => {
	const { level, maxMoves, moves } = useGameState();
	const { entities, setEntities } = useBoard();
	const { clearLastReward } = useCoins();

	const { isFullyVisible } = useScreen();

	const disabled = !isFullyVisible;

	const { isEnded, isLocked } = useGame({
		disabled,
	});

	const controlsDisabled = isLocked || isEnded || disabled || moves >= maxMoves;

	const { swipeProps } = useControls({
		disabled: controlsDisabled,
		setEntities,
	});

	useEffect(() => {
		setEntities(getIdEntities(level));
		clearLastReward();
	}, [clearLastReward, level, setEntities]);

	return (
		<>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
			<Hint />
		</>
	);
};
