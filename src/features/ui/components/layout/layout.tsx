import $$ from './layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => (
	<div className={$$.layout}>{children}</div>
);
