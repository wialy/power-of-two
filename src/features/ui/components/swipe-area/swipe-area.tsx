import { forwardRef } from 'react';

import $$ from './swipe-area.module.css';

export const SwipeArea = forwardRef<HTMLDivElement>((properties, reference) => (
	<div
		ref={reference}
		className={$$.area}
		{...properties}
	/>
));
SwipeArea.displayName = 'SwipeArea';
