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
        return Promise.resolve().then(() => {
            this.props.todoListActions.createTodoList()
        }).then(() => {
            const lastItemId = Object.keys(this.props.todoLists.listsMap).reverse()[0];
            this.moveToItemView(lastItemId);
        });
    };

    moveToItemView = (itemId) => {
        browserHistory.push(`/todolists/${itemId}`);
        this.props.todoListActions.setEditTodoList(itemId);
    };

    render() {
        const ids = Object.keys(this.props.todoLists.listsMap).reverse();

        return (
            <div className="row">
                <div className="row">
                    <div className="text-center col-md-6" >
                        <a
                            href=""
                            className="btn btn-default"
                            onClick={this.addTodo}
                        >
                            Add Todo Item
                        </a>
                    </div>
                </div>
                <div className="row">
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
            </div>
        );
    }
}

export default TodoLists;