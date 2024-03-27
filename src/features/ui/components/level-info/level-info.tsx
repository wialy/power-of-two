import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useEpisodeLevels } from '../../../editor/hooks/use-episode-levels';
import { getParsedLevelRecord } from '../../../editor/utils/get-parsed-level-record';
import { useGameState } from '../../../game/hooks/use-game-state';
import { AnimatedText } from '../animated-text';
import { Icon } from '../icon';
import $$ from './level-info.module.css';

const DELAY = 1500;

export const LevelInfo = () => {
	const { episode, level } = useGameState();
	const { levels } = useEpisodeLevels({ episode });
	const parsedLevels = levels.map(getParsedLevelRecord);
	const levelInfo = parsedLevels.find((parsedLevel) => parsedLevel.id === level);

	const [isVisible, setIsVisible] = useState(false);

	const timeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);

	const cancelTimeout = useCallback(() => {
		if (timeoutReference.current) {
			clearTimeout(timeoutReference.current);
			timeoutReference.current = null;
		}
	}, []);

	const hide = useCallback(() => {
		cancelTimeout();

		setIsVisible(false);
	}, [cancelTimeout]);

	const show = useCallback(() => {
		setIsVisible(true);

		timeoutReference.current = setTimeout(() => {
			setIsVisible(false);
		}, DELAY);
	}, []);

	useEffect(() => {
		if (!level) {
			hide();

			return;
		}

		show();

		return cancelTimeout;
	}, [cancelTimeout, hide, level, show]);

	useEffect(() => {
		window.addEventListener('keydown', hide);

		return () => {
			window.removeEventListener('keydown', hide);
		};
	}, [hide]);

	return (
		<>
			<button
				className={clsx($$.overlay, { [$$.visible]: isVisible })}
				onClick={hide}
			/>
			<div className={clsx($$.levelInfo, { [$$.visible]: isVisible })}>
				<Info
					name={levelInfo?.name}
					steps={levelInfo?.steps}
				/>
			</div>
		</>
	);
};

const Info = ({ name, steps }: { name?: string; steps?: number }) => (
	<>
		{Boolean(name) && (
			<div className={$$.name}>
				<AnimatedText>{name ?? ''}</AnimatedText>
			</div>
		)}
		{Boolean(steps) && (
			<div className={$$.pro}>
				<Icon name="pro" />
				{steps}
			</div>
		)}
	</>
);
