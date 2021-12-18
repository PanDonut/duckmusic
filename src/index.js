import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/index";
import App from './App';
import { setConfig } from 'react-google-translate';
import './style/index.css';

setConfig({
    clientEmail: process.env.REACT_APP_GCP_CLIENT_EMAIL ?? '',
    privateKey: process.env.REACT_APP_GCP_PRIVATE_KEY ?? '',
    projectId: process.env.REACT_APP_GCP_PROJECT_ID ?? ''
})

const store = createStore(reducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);