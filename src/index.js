import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { Provider } from 'react-redux';
import store from './store';
import { ipcRenderer } from 'electron';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
ipcRenderer.on('message', (event, message) => {
    console.log('Message from main process:', message);
});

