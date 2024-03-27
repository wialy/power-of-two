import clsx from 'clsx';

import { useResult } from '../../../game/hooks/use-result';
import { Screen } from '../screen';
import $$ from './win-screen.module.css';
import { WinScreenContent } from './win-screen-content';

export const WinScreen = () => {
	const { isPro } = useResult();

	return (
		<Screen
			className={clsx($$.winScreen, { [$$.pro]: isPro })}
			id="won"
		>
			<WinScreenContent />
		</Screen>
	);
};
