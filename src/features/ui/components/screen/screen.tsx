import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useGameState } from '../../../game/hooks/use-game-state';
import { ScreenId } from '../../../game/types';
import $$ from './screen.module.css';

export const Screen = ({
	children,
	id,
}: {
	children: React.ReactNode;
	id: ScreenId;
}) => {
	const { screen, screens } = useGameState();

	const isHidden = screen !== id;
	const [isFullyHidden, setIsFullyHidden] = useState(isHidden);

	const direction = screens.indexOf(id) < screens.indexOf(screen) ? 1 : -1;

	const timeoutReference = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		if (timeoutReference.current) {
			clearTimeout(timeoutReference.current);
		}

		if (isHidden) {
			timeoutReference.current = setTimeout(() => {
				setIsFullyHidden(true);
			}, 500);
		} else {
			setIsFullyHidden(false);
		}

		return () => {
			if (timeoutReference.current) {
				clearTimeout(timeoutReference.current);
			}
		};
	}, [isHidden]);

	return (
		<div
			className={clsx($$.screen, {
				[$$.hidden]: isHidden,
				[$$.up]: direction === 1,
				[$$.down]: direction === -1,
			})}
			id={id}
		>
			{!isFullyHidden && children}
		</div>
	);
};
