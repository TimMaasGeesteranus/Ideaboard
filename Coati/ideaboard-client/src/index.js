import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/UIComponents/AppUI/App';
import * as serviceWorker from './service-worker';
import * as Redux from 'redux';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import history from './history';

import rootReducer from './reducers/rootReducer';

const logger = (store) => (next) => (action) => {
    // console.log('ACTION:', action.type, action);
    let result = next(action);
    // console.log('STATE AFTER ACTION:', action.type, store.getState());
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
export const theStore = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, logger),
));

const mainComponent =
    <Provider store={theStore}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>;


ReactDOM.render(mainComponent, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
