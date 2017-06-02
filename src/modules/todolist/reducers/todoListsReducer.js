import * as types from '../constants/TodoList';
import TodoList from '../models/TodoList';
import TodoListItem from '../models/TodoListItem';

const item = new TodoList(0, 'test', {
    0: new TodoListItem(0, 'Сделать тестовое задание', true),
    1: new TodoListItem(1, 'Поговорить с Аней', true),
    2: new TodoListItem(2, 'Поесть', false),
    3: new TodoListItem(3, 'Усомниться в reactjs', false),
    4: new TodoListItem(4, 'Стать мастером верстки: FAILED', false),
}, 5);

const initialState = {
    listsMap: {[item.id]: item},
    lastId: 1,
    editListId: null
};

const todoListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_TODO_LIST: {
            const listsMap = {
                [state.lastId]: new TodoList(state.lastId),
                ...state.listsMap
            };

            return {
                ...state,
                listsMap,
                lastId: state.lastId + 1
            };
        }

        case types.REMOVE_TODO_LIST: {
            const listsMap = {...state.listsMap};
            delete listsMap[action.id];

            return {
                ...state,
                listsMap
            };
        }

        case types.SET_EDITING_TODO_LIST_ID: {
            return {
                ...state,
                editListId: action.id
            }
        }

        case types.SAVE_TODO_LIST: {
            const listsMap = {...state.listsMap};
            const item = action.item;

            listsMap[item.id] = item;

            return {
                ...state,
                listsMap
            }
        }

        case types.CHANGE_IS_DONE_TODO_ITEM: {
            const listsMap = {...state.listsMap};
            const { todoListId, itemId, newValue} = action;

            listsMap[todoListId].items[itemId].isDone = newValue;

            return {
                ...state,
                listsMap
            }
        }

        default:
            return state;
    }
};


export default todoListsReducer;