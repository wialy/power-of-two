/* eslint-disable jsx-a11y/no-access-key */
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '../../../ui/components/button';
import { Stepper } from '../../../ui/components/stepper';
import { useEditorContext } from '../../contexts/editor-context';
import { useSolution } from '../../hooks/use-solution';
import { EditorOption } from '../editor-option';
import $$ from './level-info-sidebar.module.css';

export const LevelInfoSidebar = () => {
	const { level, seed, setSeed } = useEditorContext();
	const { iterations, solution, solve, steps } = useSolution();

	const handleSolveTriggered = () => {
		void solve();
	};

	useHotkeys('=', handleSolveTriggered);

	useHotkeys('[', () => {
		if (seed > 0) {
			setSeed(seed - 1);
		}
	});

	useHotkeys(']', () => {
		setSeed(seed + 1);
	});

	return (
		<aside className={$$.container}>
			<EditorOption
				control={
					<Stepper
						initialValue={seed}
						onValueChange={setSeed}
					/>
				}
				icon={
					<Button
						style={{ transform: 'translate(-50%, -50%)' }}
						type="button"
						onClick={() => {
							setSeed(Math.floor(Math.random() * 10_000));
						}}
					>
						🎲
					</Button>
				}
			/>
			<div>
				<Button
					type="button"
					onClick={handleSolveTriggered}
				>
					Resolve
				</Button>
			</div>
			{level.id?.length > 0 && <div className={$$.id}>{level.id}</div>}
			<div className={$$.solution}>{solution}</div>
			<div className={$$.summary}>
				{steps !== undefined && (
					<div
						aria-label="steps"
						title="steps"
					>
						⚡️ <strong>{steps}</strong>
					</div>
				)}
				{iterations !== undefined && (
					<div
						aria-label="iterations"
						title="iterations"
					>
						🤔 <strong>{iterations}</strong>
					</div>
				)}
				{iterations !== undefined && steps !== undefined && (
					<div
						aria-label="complexity"
						title="complexity"
					>
						🔰 <strong>{(iterations / steps).toFixed(2)}</strong>
					</div>
				)}
			</div>
		</aside>
	);
};
