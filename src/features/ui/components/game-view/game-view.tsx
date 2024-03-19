import { useMemo } from 'react';

import { getIdEntities } from '../../../editor/utils/get-id-entities';
import { useControls } from '../../../game/hooks/use-controls';
import { useGame } from '../../../game/hooks/use-game';
import { useGameState } from '../../../game/hooks/use-game-state';
import { BoardView } from '../board-view';
import { SwipeArea } from '../swipe-area';

export const GameView = () => {
	const { level } = useGameState();

	const levelEntities = useMemo(() => getIdEntities(level), [level]);

	const { entities, setEntities } = useGame({
		level: { entities: levelEntities, id: '' },
	});

	const { swipeProps } = useControls({ setEntities });

	return (
		<>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
		</>
	);
};
