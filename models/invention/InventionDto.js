class inventionDtoData {
    _id;
    _name;
}

class inventionDto extends inventionDtoData {
    constructor(
        id = "",
        name = ""
    ) {
        this._id = id;
        this._name = name;
    }

    getId() { return this._id; }
    getName() { return this._name; }

    setId(id = "") { this._id = id; }
    setName(name = "") { this._name = name; }
}
module.exports = inventionDto;