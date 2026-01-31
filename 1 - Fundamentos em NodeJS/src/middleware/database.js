export class DataBase {
    #database = {}

    select(table) {
        const result = this.#database[table];
        return result;
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data];
        }
    }
}