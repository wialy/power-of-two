import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Editor from './editor.tsx';

const root = document.querySelector('#root');

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<Editor />
		</React.StrictMode>,
	);
}
