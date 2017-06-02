import { createStore, applyMiddleware } from 'redux'
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import { compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';

import App from './app/App';
import NotFound from './app/NotFound';
import TodoLists from './modules/todolist/TodoLists';
import TodoListForm from './modules/todolist/TodoListForm';

const createStoreWithMiddleware = compose (
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="/todolists/list" />

                <Route path="todolists">
                    <IndexRedirect to="list" />
                    <Route path="list" component={TodoLists} />
                    <Route path=":listId" component={TodoListForm}  />
                </Route>

                <Route path="404" component={NotFound}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(router, document.getElementById('app-container'));