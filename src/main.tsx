import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Graph from './containers/graph.container';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Provider store={store}>
            <Graph/>
        </Provider>
)
