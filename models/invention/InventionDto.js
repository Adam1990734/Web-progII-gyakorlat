class inventionDtoData {
    _name;
}

class inventionDto extends inventionDtoData {
    constructor(name = "") {
        super();
        this._name = name;
    }

    get getName() { return this._name; }

    set setName(name = "") { this._name = name; }
}
module.exports = inventionDto;