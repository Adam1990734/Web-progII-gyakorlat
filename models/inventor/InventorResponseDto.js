class InventorDtoResponseData {
    _id;
    _name;
    _bornAt;
    _diedAt;
    _invention_ids;
}

class InventorResponseDto extends InventorDtoResponseData {
    constructor(
        id = "",
        name = "",
        bornAt = 0,
        diedAt = 0,
        invention_ids = []
    ) {
        super();
        this._id = id;
        this._name = name;
        this._bornAt = bornAt;
        this._diedAt = diedAt;
        this._invention_ids = invention_ids;
    }

    getId() { return this._id; }
    getName() { return this._name; }
    getBornAt() { return this._bornAt; }
    getDiedAt() { return this._diedAt; }
    getInventionIds() { return this._invention_ids; }

    setId(id = "") { this._id = id; }
    setName(name = "") { this._name = name; }
    setBornAt(bornAt = 0) { this._bornAt = bornAt; }
    setDiedAt(diedAt = 0) { this._diedAt = diedAt; }
    setInventionIds(invention_ids = []) { this._invention_ids = invention_ids; }
}
module.exports = InventorResponseDto;