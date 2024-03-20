import { ReactNode } from 'react';

import { useScreen } from './screen-provider';

export const ScreenContent = ({ children }: { children: ReactNode }) => {
	const { isFullyHidden } = useScreen();

	return <>{!isFullyHidden && children}</>;
};
