import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './game.tsx';

const root = document.querySelector('#root');

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<Game />
		</React.StrictMode>,
	);
}
