import $$ from './screen-container.module.css';

export const ScreenContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => <div className={$$.screenContainer}>{children}</div>;
