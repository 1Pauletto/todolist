import * as types from '../constants/TodoList';

export const createTodoList = () => ({
    type: types.CREATE_TODO_LIST
});

export const deleteTodoList = (id) => ({
    type: types.REMOVE_TODO_LIST,
    id
});

export const setEditTodoList = (id) => ({
    type: types.SET_EDITING_TODO_LIST_ID,
    id
});

export const updateTodoList = (item) => ({
    type: types.SAVE_TODO_LIST,
    item
});

export const changeIsDoneTodoItem = (todoListId, itemId, newValue) => ({
    type: types.CHANGE_IS_DONE_TODO_ITEM,
    todoListId,
    itemId,
    newValue
});