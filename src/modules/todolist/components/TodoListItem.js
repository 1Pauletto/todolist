import React from 'react';
import { preventDefault } from 'common/helpers/Functions';
import Linkify from 'react-linkify';

export const TodoListItem = (props) => {
    const itemTextClass = props.item.isDone ? "done-item" : "";

    return (
        <div className="checkbox">
            <label
                onClick={e => preventDefault(e, props.changeIsDoneTodoItem, props.todoListId, props.item.id, !props.item.isDone)}
            >
                <input
                    checked={props.item.isDone}
                    type="checkbox"
                    readOnly
                />
            </label>

                {props.isEditingTodoList ?
                    <input
                        type="text"
                        className={itemTextClass}
                        value={props.item.content}
                        onChange={e => props.changeTodoItemContent(props.todoListId, props.item.id, e.target.value)}
                    />
                    :
                    <span className={itemTextClass}>
                        <Linkify properties={{target: '_blank'}}>
                            {props.item.content}
                        </Linkify>
                    </span>
                }

                {props.isEditingTodoList ?
                    <button
                        type="submit"
                        onClick={e => props.deleteTodoItem(props.todoListId, props.item.id)} className="btn btn-default"
                    >
                            -
                    </button>
                    :
                    null
                }
        </div>
    );
};

TodoListItem.PropTypes = {
    item: React.PropTypes.instanceOf(TodoListItem).isRequired,
    todoListId: React.PropTypes.number.isRequred,
    isEditingTodoList: React.PropTypes.bool.isRequred,

    changeIsDoneTodoItem: React.PropTypes.func.isRequred,
    changeTodoItemContent: React.PropTypes.func,
    deleteTodoItem: React.PropTypes.func
};

export default TodoListItem;