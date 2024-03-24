import './global.css';

import { useEffect } from 'react';

import { EntitiesSidebar } from './features/editor/components/entities-sidebar/entities-sidebar';
import { LevelInfoSidebar } from './features/editor/components/level-info-sidebar';
import { useEditorContext } from './features/editor/contexts/editor-context';
import { useBoard } from './features/game/hooks/use-board';
import { useControls } from './features/game/hooks/use-controls';
import { useGame } from './features/game/hooks/use-game';
import { BoardView } from './features/ui/components/board-view';
import { SwipeArea } from './features/ui/components/swipe-area';

const Editor = () => {
	const { level } = useEditorContext();

	const { entities, setEntities } = useBoard();
	const { isEnded, isLocked } = useGame({});

	const { swipeProps } = useControls({
		disabled: isEnded || isLocked,
		setEntities,
	});

	useEffect(() => {
		setEntities(level.entities);
	}, [level.entities, setEntities]);

	return (
		<div
			style={{
				display: 'flex',
				inset: 0,
				position: 'fixed',
			}}
		>
			<EntitiesSidebar />
			<div style={{ flex: 1, position: 'relative' }}>
				<BoardView board={{ entities }} />
				<SwipeArea {...swipeProps} />
			</div>
			<LevelInfoSidebar />
		</div>
	);
};

export default Editor;
