import { ReactNode } from 'react';

import $$ from './layout.module.css';

export const Layout = ({
	children,
	navigation,
}: {
	children: ReactNode;
	navigation: ReactNode;
}) => (
	<div className={$$.layout}>
		<nav className={$$.navigation}>{navigation}</nav>
		<div className={$$.content}>{children}</div>
	</div>
);
