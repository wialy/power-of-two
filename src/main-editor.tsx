import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Editor from './editor.tsx';
import { EditorContextProvider } from './features/editor/contexts/editor-context/editor-context.tsx';

const root = document.querySelector('#root');

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<EditorContextProvider>
				<Editor />
			</EditorContextProvider>
		</React.StrictMode>,
	);
}
