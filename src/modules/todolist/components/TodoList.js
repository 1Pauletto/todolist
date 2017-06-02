import React from 'react';
import { preventDefault } from 'common/helpers/Functions';
import TodoListModel from '../models/TodoList';
import TodoListItem from './TodoListItem';
import Linkify from 'react-linkify';

export const TodoList = (props) => {

    const itemsIds = Object.keys(props.item.items);

    let newItemsIds = [];
    let doneItemsIds = [];

    itemsIds.forEach(id => {
        const item = props.item.items[id];

        if (item.isDone) {
            doneItemsIds.push(item);
        } else {
            newItemsIds.push(item);
        }
    });

    return (
        <div>
            <form>
                <div onClick="">
                    <Linkify properties={{target: '_blank'}}>{props.item.name}</Linkify>
                </div>
                <div>
                    Id: {props.item.id}
                </div>
                {newItemsIds.map(item => {
                    return (
                        <TodoListItem
                            key={`done-iten-${props.item.id}-${item.id}`}
                            item={item}
                            todoListId={props.item.id}
                            isEditingTodoList={props.isEditingTodoList}
                            changeIsDoneTodoItem={props.changeIsDoneTodoItem}
                        />
                    );
                })}

                {doneItemsIds.map(item => {
                    return (
                        <TodoListItem
                            key={`done-iten-${props.item.id}-${item.id}`}
                            item={item}
                            todoListId={props.item.id}
                            isEditingTodoList={props.isEditingTodoList}
                            changeIsDoneTodoItem={props.changeIsDoneTodoItem}
                        />
                    );
                })}
                <div>
                    <a className="btn btn-primary" href="" onClick={e => preventDefault(e, props.setEditTodoList, props.item.id)}>Edit</a>
                    <a className="btn btn-danger" href="" onClick={e => preventDefault(e, props.deleteTodoList, props.item.id)}>-</a>
                </div>
            </form>
        </div>
    );
};

TodoList.PropTypes = {
    item: React.PropTypes.instanceOf(TodoListModel).isRequired,

    deleteTodoList: React.PropTypes.func.isRequired,
    changeIsDoneTodoItem: React.PropTypes.func.isRequired,
    setEditTodoList: React.PropTypes.func.isRequired,
    isEditingTodoList: React.PropTypes.bool.isRequired,
};

export default TodoList;