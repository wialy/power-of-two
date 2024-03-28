import { Button } from '../../../ui/components/button';
import { Icon } from '../../../ui/components/icon';
import { useSoundState } from '../../hooks/use-sound-state';
import $$ from './sound-toggle.module.css';

export const SoundToggle = () => {
	const { isMuted, toggleMute } = useSoundState();

	return (
		<Button
			className={$$.soundToggle}
			size="small"
			onClick={toggleMute}
		>
			<Icon name={isMuted ? 'volume-mute' : 'volume-on'} />
		</Button>
	);
};
