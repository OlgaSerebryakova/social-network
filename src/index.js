import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/redux-store';

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
      <App store={store} dispatch={store.dispatch.bind(store)}/>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

