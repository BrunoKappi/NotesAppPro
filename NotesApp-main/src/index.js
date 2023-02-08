import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './components/store/store';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);


         