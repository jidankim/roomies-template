import React from 'react';
import ReactDOM from 'react-dom';

// Router
import Router from './router';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
      <Router/>
    </Provider>, rootElement
);
