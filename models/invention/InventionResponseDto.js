class inventionResponseDtoData {
    _id;
    _name;
    _inventors;
}

class inventionResponseDto extends inventionResponseDtoData {
    constructor(
        id = "",
        name = "",
        inventors = []
    ) {
        this._id = id;
        this._name = name;
        this._inventors = inventors;
    }

    getId() { return this._id; }
    getName() { return this._name; }
    getInventorIds() { return this._inventors; }

    setId(id) { this._id = id; }
    setName(name) { this._name = name; }
    setInventors(inventors) { this._inventors = inventors; }
}
module.exports = inventionResponseDto;