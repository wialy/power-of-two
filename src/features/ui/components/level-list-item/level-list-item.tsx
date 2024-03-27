import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';

import { ID_SYMBOLS } from '../../../editor/constants';
import { LevelRecord } from '../../../editor/types';
import { getSymbolEntity } from '../../../editor/utils/get-symbol-entity';
import { MAX_MOVES_MULTIPLIER } from '../../../game/constants';
import { useGameState } from '../../../game/hooks/use-game-state';
import { Highscore } from '../../../game/types';
import { AnimatedText } from '../animated-text';
import { EntityPreview } from '../entity-preview/entity-preview';
import { Icon } from '../icon';
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

	const isPro = highscore && highscore.moves <= steps;

	const handleClick = () => {
		setLevel(id);
		setMaxMoves(steps * MAX_MOVES_MULTIPLIER);
		setScreen('game');
	};

	const reference = useRef<HTMLButtonElement>(null);

	useEffect(() => {
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
				className={clsx($$.container, $$.locked)}
			>
				<Preview
					isLocked
					id={id}
				/>
				<div className={$$.info}>
					<div className={$$.name}>{name}</div>
				</div>
			</button>
		);
	}

	return (
		<button
			ref={reference}
			className={clsx($$.container, {
				[$$.pro]: isPro,
				[$$.completed]: !isPro && highscore !== undefined,
			})}
			onClick={handleClick}
		>
			<Preview id={id} />
			<div className={$$.info}>
				<div className={$$.name}>
					<AnimatedText>{name}</AnimatedText>
				</div>
				<div className={$$.scores}>
					{highscore !== undefined && <div>Best {highscore.moves}</div>}
					<div>Pro {steps}</div>
				</div>
			</div>
			{Boolean(isPro) && (
				<div className={$$.badge}>
					<Icon name="pro" />
				</div>
			)}
		</button>
	);
};

const Preview = memo(({ id, isLocked }: { id: string; isLocked?: boolean }) => {
	const rows = id.split(ID_SYMBOLS.delimiter).map((row) => [...row]);

	return (
		<div className={clsx($$.previewContainer, { [$$.locked]: isLocked })}>
			{Boolean(isLocked) && (
				<div className={$$.lock}>
					<Icon name="lock" />
				</div>
			)}
			{!isLocked &&
				rows.map((row, y) => (
					<div
						key={y}
						className={$$.previewRow}
					>
						{row.map((symbol, x) => {
							const entity = getSymbolEntity(symbol);

							return (
								<EntityPreview
									key={x}
									entity={entity}
								/>
							);
						})}
					</div>
				))}
		</div>
	);
});
Preview.displayName = 'Preview';
