import { Board } from '../../../engine/types/board';
import { TILE_SIZE } from '../constants';
import { EntityView } from '../entity-view';

export const BoardView = ({ board }: { board: Board }) => {
	const { entities } = board;

	const width = Math.max(...entities.map((entity) => entity.position.x)) + 1;
	const height = Math.max(...entities.map((entity) => entity.position.y)) + 1;

	return (
		<div
			style={{
				left: '50%',
				position: 'absolute',
				top: '50%',
				transform: `translate(${(-width * TILE_SIZE) / 2}px, ${
					(-height * TILE_SIZE) / 2
				}px)`,
			}}
		>
			{entities.map((entity) => (
				<EntityView
					key={entity.id}
					entity={entity}
				/>
			))}
		</div>
	);
};
