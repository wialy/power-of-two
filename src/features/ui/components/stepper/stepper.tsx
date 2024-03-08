import { HTMLAttributes, useCallback, useEffect, useState } from 'react';

import { Button } from '../button';
import $$ from './stepper.module.css';

export const Stepper = ({
	initialValue,
	onValueChange,
	...properties
}: {
	initialValue: number;
	onValueChange?: (value: number) => void;
} & HTMLAttributes<HTMLDivElement>) => {
	const [value, setValue] = useState(initialValue);

	const handlePlusClick = useCallback(() => {
		setValue((previousValue) => {
			onValueChange?.(previousValue + 1);

			return previousValue + 1;
		});
	}, [onValueChange]);

	const handleMinusClick = useCallback(() => {
		setValue((previousValue) => {
			if (previousValue === 0) return 0;

			onValueChange?.(previousValue - 1);

			return previousValue - 1;
		});
	}, [onValueChange]);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<div
			className={$$.container}
			{...properties}
		>
			<span className={[$$.value, value === 0 ? $$.zero : ''].join(' ')}>
				{value}
			</span>
			<Button
				disabled={value <= 0}
				size="small"
				type="button"
				onClick={handleMinusClick}
			>
				-
			</Button>
			<Button
				size="small"
				type="button"
				onClick={handlePlusClick}
			>
				+
			</Button>
		</div>
	);
};
