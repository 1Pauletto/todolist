import { combineReducers } from 'redux';
import todoListsReducer from '../modules/todolist/reducers/todoListsReducer';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    todoLists: todoListsReducer,

    routing: routerReducer
});