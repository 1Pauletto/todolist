export default class TodoListItem {
    constructor(id, content = '', isDone = false) {
        this.id = id;
        this.content = content;
        this.isDone = isDone;
    }
}