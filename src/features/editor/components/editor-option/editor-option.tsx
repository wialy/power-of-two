import { ReactNode } from 'react';

import $$ from './editor-option.module.css';

export const EditorOption = ({
	control,
	icon,
}: {
	icon: ReactNode;
	control: ReactNode;
}) => (
	<div className={$$.option}>
		<div className={$$.icon}>
			<div className={$$.tile}>{icon}</div>
		</div>
		<div className={$$.control}>{control}</div>
	</div>
);
