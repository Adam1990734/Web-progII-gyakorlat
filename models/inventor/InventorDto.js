class InventorDtoData {
    _name;
    _bornAt;
    _diedAt;
}

class InventorDto extends InventorDtoData {
    constructor(
        name = "",
        bornAt = 0,
        diedAt = 0
    ) {
        this._name = name;
        this._bornAt = bornAt;
        this._diedAt = diedAt;
    }

    get getName() { return this._name; }
    get getBornAt() { return this._bornAt; }
    get getDiedAt() { return this._diedAt; }

    set setName(name = "") { this._name = name; }
    set setBornAt(bornAt = 0) { this._bornAt = bornAt; }
    set setDiedAt(diedAt = 0) { this._diedAt = diedAt; }
}
module.exports = InventorDto;