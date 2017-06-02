export default class TodoList {
    constructor(id, name = '', items = {}, nextItemId = 0) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.nextItemId = nextItemId;
    }
}