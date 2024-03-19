import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import $$ from './button.module.css';

type Size = 'small' | 'medium' | 'large';

export const Button = ({
	children,
	className,
	size = 'medium',
	...properties
}: { size?: Size } & ButtonHTMLAttributes<HTMLButtonElement>) => (
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
	>
		{children}
	</button>
);
