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

    get getId() { return this._id; }
    get getName() { return this._name; }

    set setId(id = "") { this._id = id; }
    set setName(name = "") { this._name = name; }
}
module.exports = inventionDto;