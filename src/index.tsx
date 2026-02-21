import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {ThemeProvider} from "./theme/ThemeContext"

// Polyfill process for libraries that expect it (like twitch-player)
if (typeof window !== 'undefined' && !window.process) {
    // @ts-ignore
    window.process = { env: { NODE_ENV: 'development' } };
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
