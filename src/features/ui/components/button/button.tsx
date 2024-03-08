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
		className={[$$.button, size === 'small' && $$.small, className]
			.filter(Boolean)
			.join(' ')}
		{...properties}
	>
		{children}
	</button>
);
