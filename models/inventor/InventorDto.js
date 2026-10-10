class InventorDtoData {
    _name;
    _bornAt;
    _diedAt;
    _inventions;
}

class InventorDto extends InventorDtoData {
    constructor(
        name = "",
        bornAt = 0,
        diedAt = 0,
        inventions = []
    ) {
        super();
        this._name = name;
        this._bornAt = bornAt;
        this._diedAt = diedAt;
        this._inventions = inventions;
    }

    getName() { return this._name; }
    getBornAt() { return this._bornAt; }
    getDiedAt() { return this._diedAt; }

    setName(name) { this._name = name; }
    setBornAt(bornAt) { this._bornAt = bornAt; }
    setDiedAt(diedAt) { this._diedAt = diedAt; }
    setInventors(inventors) { this._inventions = inventors; }
}
module.exports = InventorDto;