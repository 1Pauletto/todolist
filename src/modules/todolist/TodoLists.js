import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as TodoListActions from './actions/TodoListActions';
import TodoItem from './models/TodoList';
import TodoList from './components/TodoList';

@connect(
    state => ({
        todoLists: state.todoLists
    }),
    dispatch => ({
        todoListActions: bindActionCreators(TodoListActions, dispatch)
    })
)

class TodoLists extends Component {

    static propTypes = {

        todoLists: React.PropTypes.shape({
            listsMap: React.PropTypes.objectOf(React.PropTypes.instanceOf(TodoItem)),
            editListId: React.PropTypes.number
        }),

        todoListActions: React.PropTypes.shape({
            createTodoList: React.PropTypes.func.isRequired,
            deleteTodoList: React.PropTypes.func.isRequired,
            setEditTodoList: React.PropTypes.func.isRequired,
            changeIsDoneTodoItem: React.PropTypes.func.isRequired,
        })
    };

    addTodo = (e) => {
        e.preventDefault();
        this.props.todoListActions.createTodoList();
    };

    moveToItemView = (itemId) => {
        browserHistory.push(`/todolists/${itemId}`);
        this.props.todoListActions.setEditTodoList(itemId);
    };

    render() {
        const ids = Object.keys(this.props.todoLists.listsMap).reverse();

        return (
            <div>
                <a href="" className="btn btn-default" onClick={this.addTodo}>Add Todo Item</a> &nbsp; Count: {ids.length}
                {ids.length ?
                    ids.map((id, key) => {
                        return (
                            <TodoList
                                key={key}
                                item={this.props.todoLists.listsMap[id]}
                                setEditTodoList={this.moveToItemView}
                                deleteTodoList={this.props.todoListActions.deleteTodoList}
                                isEditingTodoList={this.props.todoLists.editListId === id}
                                changeIsDoneTodoItem={this.props.todoListActions.changeIsDoneTodoItem}
                            />
                        );
                    })
                    :
                    <p>
                        There is no any item.
                    </p>
                }
            </div>
        );
    }
}

export default TodoLists;