import { useEffect, useState } from 'react';

import { Button } from '../button';
import { Icon } from '../icon';
import $$ from './fullscreen-toggle.module.css';

export const FullscreenToggle = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = () => {
		setIsFullscreen((previous) => !previous);
	};

	useEffect(() => {
		if (isFullscreen) {
			void document.documentElement.requestFullscreen();
		} else {
			void document.exitFullscreen();
		}
	}, [isFullscreen]);

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
