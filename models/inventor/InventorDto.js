class InventorDtoData {
    _id;
    _name;
    _bornAt;
    _diedAt;
}

class InventorDto extends InventorDtoData {
    constructor(
        id = "",
        name = "",
        bornAt = 0,
        diedAt = 0
    ) {
        this._id = id;
        this._name = name;
        this._bornAt = bornAt;
        this._diedAt = diedAt;
    }

    getId() { return this._id; }
    getName() { return this._name; }
    getBornAt() { return this._bornAt; }
    getDiedAt() { return this._diedAt; }

    setId(id = "") { this._id = id; }
    setName(name = "") { this._name = name; }
    setBornAt(bornAt = 0) { this._bornAt = bornAt; }
    setDiedAt(diedAt = 0) { this._diedAt = diedAt; }
}
module.exports = InventorDto;