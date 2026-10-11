class inventionDtoData {
    _name;
}

class inventionDto extends inventionDtoData {
    constructor(
        name = ""
    ) {
        super();
        this._name = name;
    }

    getName() { return this._name; }

    setName(name) { this._name = name; }
}
module.exports = inventionDto;