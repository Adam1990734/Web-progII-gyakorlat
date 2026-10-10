class InventorDtoResponseData {
    _id;
    _name;
    _bornAt;
    _diedAt;
    _inventions;
}

class InventorResponseDto extends InventorDtoResponseData {
    constructor(
        id = "",
        name = "",
        bornAt = 0,
        diedAt = 0,
        inventions = []
    ) {
        super();
        this._id = id;
        this._name = name;
        this._bornAt = bornAt;
        this._diedAt = diedAt;
        this._inventions = inventions;
    }

    getId() { return this._id; }
    getName() { return this._name; }
    getBornAt() { return this._bornAt; }
    getDiedAt() { return this._diedAt; }
    getInventions() { return this._inventions; }

    setId(id) { this._id = id; }
    setName(name) { this._name = name; }
    setBornAt(bornAt) { this._bornAt = bornAt; }
    setDiedAt(diedAt) { this._diedAt = diedAt; }
    setInventionIds(inventions) { this._inventions = inventions; }
}
module.exports = InventorResponseDto;