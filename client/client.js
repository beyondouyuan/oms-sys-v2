/**
 * client端入口
 */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import createApp from './src/App';
import './index.scss';

const initalStore = window.__INITIAL__STORE__ || {};
const { router, store } = createApp(initalStore);
ReactDom.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            { router }
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)