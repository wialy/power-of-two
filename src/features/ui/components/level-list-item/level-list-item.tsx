import { memo, useLayoutEffect, useRef } from 'react';

import { LevelRecord } from '../../../editor/types';
import { getIdEntities } from '../../../editor/utils/get-id-entities';
import { getBounds } from '../../../engine/utils/get-bounds';
import { MAX_MOVES_MULTIPLIER } from '../../../game/constants';
import { useGameState } from '../../../game/hooks/use-game-state';
import { Highscore } from '../../../game/types';
import { TILE_SIZE } from '../../constants';
import { EntityView } from '../entity-view';
import $$ from './level-list-item.module.css';

export const LevelListItem = ({
	highscore,
	isLocked,
	level: { id, name, steps },
}: {
	level: LevelRecord;
	highscore?: Highscore;
	isLocked?: boolean;
}) => {
	const { setLevel, setMaxMoves, setScreen } = useGameState();

	const handleClick = () => {
		setLevel(id);
		setMaxMoves(steps * MAX_MOVES_MULTIPLIER);
		setScreen('game');
	};

	const reference = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		if (
			!isLocked &&
			highscore === undefined &&
			reference.current &&
			reference.current.parentElement?.parentElement
		) {
			reference.current.parentElement.parentElement.scrollTo({
				behavior: 'smooth',
				top: reference.current.offsetTop - 100,
			});
		}
	}, [isLocked, highscore]);

	if (isLocked) {
		return (
			<button
				disabled
				className={$$.container}
			>
				<Preview
					isLocked
					id={id}
				/>
				<div className={$$.info}>
					<div className={$$.name}>{name}</div>
					<div className={$$.scores}>
						<div>🔒 Locked</div>
					</div>
				</div>
			</button>
		);
	}

	return (
		<button
			ref={reference}
			className={$$.container}
			onClick={handleClick}
		>
			<Preview id={id} />
			<div className={$$.info}>
				<div className={$$.name}>{name}</div>
				<div className={$$.scores}>
					{highscore !== undefined && <div>Best {highscore.moves}</div>}
					<div>Pro {steps}</div>
				</div>
			</div>
		</button>
	);
};

const SCALE = 0.2;

const Preview = memo(({ id, isLocked }: { id: string; isLocked?: boolean }) => {
	const entities = getIdEntities(id);
	const { bottomRight, topLeft } = getBounds({ entities });
	const width = bottomRight.x - topLeft.x;
	const height = bottomRight.y - topLeft.y;

	return (
		<div className={$$.previewContainer}>
			{Boolean(isLocked) && <div className={$$.locked}>🔒</div>}
			{!isLocked && (
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
			)}
		</div>
	);
});
Preview.displayName = 'Preview';
