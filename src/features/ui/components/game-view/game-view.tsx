import { useEffect } from 'react';

import { getIdEntities } from '../../../editor/utils/get-id-entities';
import { useBoard } from '../../../game/hooks/use-board';
import { useControls } from '../../../game/hooks/use-controls';
import { useGame } from '../../../game/hooks/use-game';
import { useGameState } from '../../../game/hooks/use-game-state';
import { BoardView } from '../board-view';
import { Hint } from '../hint';
import { useScreen } from '../screen/screen-provider';
import { SwipeArea } from '../swipe-area';

export const GameView = () => {
	const { level } = useGameState();
	const { entities, setEntities } = useBoard();

	const { isFullyVisible } = useScreen();
	const disabled = !isFullyVisible;

	useGame({
		disabled,
	});

	const { swipeProps } = useControls({ disabled, setEntities });

	useEffect(() => {
		setEntities(getIdEntities(level));
	}, [level, setEntities]);

	return (
		<>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
			<Hint />
		</>
	);
};
