class inventorShortDtoData {
    _id;
    _name;
}

class inventorShortDto extends inventorShortDtoData {
    constructor(
        id = "",
        name = ""
    ) {
        super();
        this._id = id;
        this._name = name;
    }

    getId() { return this._id; }
    getName() { return this._name; }

    setId(id) { this._id = id; }
    setName(name) { this._name = name; }
}
module.exports = inventorShortDto;