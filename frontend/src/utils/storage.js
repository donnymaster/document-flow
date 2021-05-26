class Storage {
    storage = null;

    constructor() {
        this.storage = window.localStorage;
    }

    getItem = (key) => this.storage.getItem(key);
    addItem = (key, value) => this.storage.setItem(key, value);
    removeItem = (key) => this.storage.removeItem(key);
    clearAll = () => this.storage.clear();

}

export default new Storage();