import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as TodoListActions from './actions/TodoListActions';
import { Link } from 'react-router';
import TodoListModal from './models/TodoList';
import TodoListItemModel from './models/TodoListItem';
import TodoListItem from './components/TodoListItem';
import { preventDefault } from 'common/helpers/Functions';

@connect(
    state => ({
        todoLists: state.todoLists
    }),
    dispatch => ({
        todoListActions: bindActionCreators(TodoListActions, dispatch),
    })
)

class TodoListForm extends Component {

    static propTypes = {
        todoLists: React.PropTypes.shape({
            listsMap: React.PropTypes.objectOf(React.PropTypes.instanceOf(TodoListModal)),
            editEventId: React.PropTypes.number
        }),

        todoListActions: React.PropTypes.shape({
            updateTodoList:React.PropTypes.func.isRequired,
            setEditTodoList:React.PropTypes.func.isRequired,
            deleteTodoList: React.PropTypes.func.isRequired,
        })
    };

    state = {
        newTodoItemContent: '',
        id: null,
        name: null,
        items: null,
        nextItemId: null,
        currentTodoList: null
    };

    componentWillMount() {
        const listId = this.props.params.listId;

        if (this.props.todoLists.listsMap[listId] === undefined) {
            browserHistory.push('/404');
        }

        /** @var TodoListModal todoItem */
        const todoList = this.props.todoLists.listsMap[listId];

        this.setState({
            ...this.state,
            id: todoList.id,
            name: todoList.name,
            items: todoList.items,
            nextItemId: todoList.nextItemId,
            currentTodoList: todoList
        });
    }

    changeName = (name) => {
        this.setState({
            ...this.state,
            name
        });
    };

    updateTodoList = (e) => {
        e.preventDefault();

        if (this.isEmptyEditingTodoList()) {
            this.props.todoListActions.deleteTodoList(this.state.id);
        } else {
            const todoLists = new TodoListModal(this.state.id, this.state.name, this.state.items, this.state.nextItemId);
            this.props.todoListActions.updateTodoList(todoLists);
        }

        this.props.todoListActions.setEditTodoList(null);

        browserHistory.push(`/todolists/list`);
    };

    deleteTodoList = (e) => {
        e.preventDefault();
        this.props.todoListActions.deleteTodoList(this.state.id);
        browserHistory.push(`/todolists/list`);
    };

    changeIsDoneTodoItem = (todoListId, itemId, isDone) => {
        const newState = {...this.state};
        newState.items[itemId].isDone = isDone;
        this.setState(newState);
    };

    changeTodoItemContent = (todoListId, itemId, content) => {
        const newState = {...this.state};
        newState.items[itemId].content = content;
        this.setState(newState);
    };

    deleteTodoItem = (todoListId, itemId) => {
        const newState = {...this.state};
        delete newState.items[itemId];
        this.setState(newState);
    };

    changeNewTodoItemContent = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            newTodoItemContent: e.target.value
        });
    };

    handleNewTodoItemKeyPress = (e) => {
        const content = this.state.newTodoItemContent.trim();

        if(e.key === 'Enter' && content.length){
            const items = {...this.state.items};

            items[ this.state.nextItemId ] = new TodoListItemModel(this.state.nextItemId, content);
            this.setState({
                ...this.state,
                items,
                newTodoItemContent: '',
                nextItemId: this.state.nextItemId + 1
            });
        }
    };

    deleteIfEmpty = () => {
        this.props.todoListActions.setEditTodoList(null);
        if (this.isEmptyEditingTodoList() && this.isEmptyCachedTodoList()) {
            this.props.todoListActions.deleteTodoList(this.state.id);
        }
    };

    isEmptyEditingTodoList() {
        return this.state.name.trim().length === 0 && Object.keys(this.state.items).length === 0
    }

    isEmptyCachedTodoList() {
        return this.state.currentTodoList.name.length === 0 && Object.keys(this.state.currentTodoList.items).length === 0;
    }

    render() {
        const itemsIds = Object.keys(this.state.items);

        let newItemsIds = [];
        let doneItemsIds = [];

        itemsIds.forEach(id => {
            const item = this.state.items[id];

            if (item.isDone) {
                doneItemsIds.push(item);
            } else {
                newItemsIds.push(item);
            }
        });

        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="todolist not-done form-inline">
                        <input
                            type="text"
                            className="form-control bo"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={e => this.changeName(e.target.value)}
                        />
                        <ul className="list-unstyled">
                            {newItemsIds.map(item => {
                                return (
                                    <TodoListItem
                                        key={`done-iten-${this.state.id}-${item.id}`}
                                        item={item}
                                        todoListId={this.state.id}
                                        isEditingTodoList={true}
                                        changeIsDoneTodoItem={this.changeIsDoneTodoItem}
                                        changeTodoItemContent={this.changeTodoItemContent}
                                        deleteTodoItem={this.deleteTodoItem}
                                    />
                                );
                            })}
                        </ul>

                        <input
                            type="text"
                            onChange={this.changeNewTodoItemContent}
                            value={this.state.newTodoItemContent}
                            placeholder="Add new item"
                            onKeyPress={this.handleNewTodoItemKeyPress}
                        />

                        <ul className="list-unstyled">
                            {doneItemsIds.map(item => {
                                return (
                                    <TodoListItem
                                        key={`done-iten-${this.state.id}-${item.id}`}
                                        item={item}
                                        todoListId={this.state.id}
                                        isEditingTodoList={true}
                                        changeIsDoneTodoItem={this.changeIsDoneTodoItem}
                                        changeTodoItemContent={this.changeTodoItemContent}
                                        deleteTodoItem={this.deleteTodoItem}
                                    />
                                );
                            })}
                        </ul>

                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            onClick={this.updateTodoList}
                        >
                            Save
                        </button>

                        <button
                            type="submit"
                            onClick={this.deleteTodoList}
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>

                        <Link onClick={this.deleteIfEmpty} className="btn btn-default  btn-sm" to="/todolists/list">Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListForm;