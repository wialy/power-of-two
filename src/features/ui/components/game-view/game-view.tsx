import { useMemo } from 'react';

import { getIdEntities } from '../../../editor/utils/get-id-entities';
import { useControls } from '../../../game/hooks/use-controls';
import { useGame } from '../../../game/hooks/use-game';
import { useGameState } from '../../../game/hooks/use-game-state';
import { BoardView } from '../board-view';
import { SwipeArea } from '../swipe-area';

export const GameView = () => {
	const { level, screen } = useGameState();

	const levelEntities = useMemo(() => getIdEntities(level), [level]);

	const disabled = screen !== 'game';
	const { entities, setEntities } = useGame({
		disabled,
		level: { entities: levelEntities, id: '' },
	});

	const { swipeProps } = useControls({ disabled, setEntities });

	return (
		<>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
		</>
	);
};
