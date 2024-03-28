import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import { SOUND } from '../../../sound/constants';
import $$ from './button.module.css';

type Size = 'small' | 'medium' | 'large';

export const Button = ({
	children,
	className,
	disabled,
	onClick,
	size = 'medium',
	...properties
}: { size?: Size } & ButtonHTMLAttributes<HTMLButtonElement>) => {
	const handleClick: typeof onClick = (event) => {
		if (disabled) return;

		onClick?.(event);
		SOUND.click.play();
	};

	return (
		<button
			className={clsx(
				$$.button,
				{
					[$$.small]: size === 'small',
					[$$.large]: size === 'large',
				},
				className,
			)}
			{...properties}
			disabled={disabled}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};
