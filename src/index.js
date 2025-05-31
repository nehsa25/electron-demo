import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles.css';
import { Provider } from 'react-redux';
import store from './store';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);