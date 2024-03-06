import './global.css';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { createLevel } from './features/editor/utls/create-level';
import {
	VECTOR_DOWN,
	VECTOR_LEFT,
	VECTOR_ZERO,
} from './features/engine/constants';
import { Entity } from './features/engine/types/entities';
import { createEntity } from './features/engine/utils/create-entity';
import { getResolution } from './features/engine/utils/get-resolution';
import { useControls } from './features/hooks/use-controls';
import { useGame } from './features/hooks/use-game';
import { BoardView } from './features/ui/components/board-view';
import { SwipeArea } from './features/ui/components/swipe-area';
import { getArrowSymbol } from './features/ui/utils/get-arrow-symbol';

const Editor = () => {
	const [seed, setSeed] = useState(0);

	const handleSeedChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSeed(Number(event.target.value));
		},
		[],
	);

	const initialEntities = useMemo<Entity[]>(
		() =>
			createLevel({
				entities: [
					...Array.from({ length: 12 }, () => createEntity('floor')),
					createEntity('floor', { target: 1 }),
					createEntity('floor', { target: 1 }),

					// createEntity('floor', { direction: VECTOR_ZERO }),
					// createEntity('floor', { direction: VECTOR_ZERO }),
					createEntity('floor', { direction: VECTOR_DOWN }),
					createEntity('floor', { direction: VECTOR_LEFT }),

					createEntity('dice', { value: 0 }),
					createEntity('dice', { value: 0 }),
					createEntity('dice', { value: 0 }),
					createEntity('dice', { value: 0 }),

					createEntity('movable'),

					createEntity('movable'),
				],
				seed,
			}) ?? [],
		[seed],
	);

	const { entities, isLocked, setEntities } = useGame({
		// disabled: true,
		level: { entities: initialEntities, id: 'editor' },
	});

	const { swipeProps } = useControls({ disabled: isLocked, setEntities });

	const [solution, setSolution] = useState<string | undefined>();

	const solve = useCallback(async () => {
		setSolution('Solving...');
		let resolutionStep = await getResolution({ entities });

		const symbols: string[] = [];
		while (resolutionStep) {
			if (resolutionStep.velocity) {
				symbols.push(getArrowSymbol(resolutionStep.velocity ?? VECTOR_ZERO));
			}

			resolutionStep = resolutionStep.previous;
		}

		if (symbols.length > 0) {
			setSolution(`Steps ${symbols.length}: ${symbols.reverse().join('')}`);
		} else {
			setSolution('No solution');
		}
	}, [entities]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'Enter': {
					void solve();

					break;
				}

				case '[': {
					setSeed((previousSeed) => previousSeed - 1);

					break;
				}

				case ']': {
					setSeed((previousSeed) => previousSeed + 1);

					break;
				}
				// No default
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [entities, solve]);

	useEffect(() => {
		setSolution(undefined);
	}, [seed]);

	return (
		<>
			<BoardView board={{ entities }} />
			<SwipeArea {...swipeProps} />
			<div
				style={{
					color: 'white',
					display: 'flex',
					fontSize: 24,
					gap: '1em',
					left: 0,
					padding: '2em',
					position: 'absolute',
					top: 0,
				}}
			>
				<input
					type="number"
					value={seed}
					onChange={handleSeedChange}
				/>
				{Boolean(solution) && <div>{solution}</div>}
			</div>
		</>
	);
};

export default Editor;
