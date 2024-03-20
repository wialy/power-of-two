import clsx from 'clsx';
import { HTMLAttributes } from 'react';

import { useGameState } from '../../../game/hooks/use-game-state';
import { ScreenId } from '../../../game/types';
import $$ from './screen.module.css';
import { ScreenContent } from './screen-content';
import { ScreenProvider } from './screen-provider';

export const Screen = ({
	children,
	className,
	id,
	...properties
}: {
	children: React.ReactNode;
	id: ScreenId;
} & HTMLAttributes<HTMLDivElement>) => {
	const { screen, screens } = useGameState();

	const currentScreenIndex = screens.indexOf(screen);
	const targetScreenIndex = screens.indexOf(id);

	const direction = Math.sign(currentScreenIndex - targetScreenIndex);

	const isVisible = screen === id;

	return (
		<ScreenProvider isVisible={isVisible}>
			<div
				className={clsx(
					$$.screen,
					{
						[$$.hidden]: !isVisible,
						[$$.up]: direction === 1,
						[$$.down]: direction === -1,
					},
					className,
				)}
				{...properties}
			>
				<ScreenContent>{children}</ScreenContent>
			</div>
		</ScreenProvider>
	);
};
