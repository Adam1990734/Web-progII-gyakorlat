class inventionDtoData {
    _name;
    _inventors;
}

class inventionDto extends inventionDtoData {
    constructor(
        name = "",
        inventors = []
    ) {
        super();
        this._name = name;
        this._inventors = inventors;
    }

    getName() { return this._name; }

    setName(name) { this._name = name; }

    getInventors() { return this._inventors; }

    setInventors(inventors) { this._inventors = inventors; }
}
module.exports = inventionDto;