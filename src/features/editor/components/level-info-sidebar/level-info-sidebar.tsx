/* eslint-disable jsx-a11y/no-access-key */
import { useSolution } from '../../hooks/use-solution';
import $$ from './level-info-sidebar.module.css';

export const LevelInfoSidebar = () => {
	const { solution, solve } = useSolution();

	return (
		<aside className={$$.container}>
			<div>
				<button
					accessKey="r"
					type="button"
					onClick={() => void solve()}
				>
					Resolve
				</button>
			</div>
			<div className={$$.solution}>
				<pre>{solution}</pre>
			</div>
		</aside>
	);
};
