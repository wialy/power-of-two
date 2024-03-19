import { memo } from 'react';

import { MAX_GRID_HEIGHT, MAX_GRID_WIDTH } from '../../../editor/constants';
import { LevelRecord } from '../../../editor/types';
import { getIdEntities } from '../../../editor/utils/get-id-entities';
import { getBounds } from '../../../engine/utils/get-bounds';
import { useGameState } from '../../../game/hooks/use-game-state';
import { TILE_SIZE } from '../../constants';
import { EntityView } from '../entity-view';
import $$ from './level-list-item.module.css';

export const LevelListItem = ({
	level: { id, name, steps },
}: {
	level: LevelRecord;
}) => {
	const { setLevel } = useGameState();

	return (
		<button
			className={$$.container}
			onClick={() => setLevel(id)}
		>
			<Preview id={id} />
			<div className={$$.info}>
				<div className={$$.name}>{name}</div>
				<div>🏆 {steps}</div>
			</div>
		</button>
	);
};

const SCALE = 0.5;

const Preview = memo(({ id }: { id: string }) => {
	const entities = getIdEntities(id);
	const { bottomRight, topLeft } = getBounds({ entities });
	const width = bottomRight.x - topLeft.x;
	const height = bottomRight.y - topLeft.y;

	return (
		<div
			style={{
				alignItems: 'center',
				backgroundColor: '#232323',
				boxSizing: 'border-box',
				display: 'flex',
				height: TILE_SIZE * MAX_GRID_HEIGHT * SCALE,
				justifyContent: 'center',
				pointerEvents: 'none',
				width: TILE_SIZE * (MAX_GRID_WIDTH + 3) * SCALE,
			}}
		>
			<pre
				style={{
					height: height * TILE_SIZE * SCALE,
					position: 'relative',
					width: width * TILE_SIZE * SCALE,
				}}
			>
				{entities.map((entity) => (
					<EntityView
						key={entity.id}
						entity={entity}
						scale={SCALE}
					/>
				))}
			</pre>
		</div>
	);
});
Preview.displayName = 'Preview';
