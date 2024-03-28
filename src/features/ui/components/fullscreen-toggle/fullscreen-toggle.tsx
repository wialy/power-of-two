import { useEffect, useState } from 'react';
import screenfull from 'screenfull';

import { Button } from '../button';
import { Icon } from '../icon';
import $$ from './fullscreen-toggle.module.css';

export const FullscreenToggle = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = () => {
		setIsFullscreen((previous) => !previous);
	};

	useEffect(() => {
		if (!isEnabled) {
			return;
		}

		void (async () => {
			try {
				await (isFullscreen ? screenfull.request() : screenfull.exit());
			} catch {
				// Ignore
			}
		})();
	}, [isEnabled, isFullscreen]);

	useEffect(() => {
		setIsEnabled(screenfull.isEnabled);
	}, []);

	if (!isEnabled) {
		return null;
	}

	return (
		<Button
			className={$$.fullscreenToggle}
			size="small"
			onClick={toggleFullscreen}
		>
			<Icon name={isFullscreen ? 'fullscreen-exit' : 'fullscreen-enter'} />
		</Button>
	);
};
