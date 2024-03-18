import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';


const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode >
);

reportWebVitals();
