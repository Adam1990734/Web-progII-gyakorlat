class inventionResponseDtoData {
    _id;
    _name;
    _inventor_ids;
}

class inventionResponseDto extends inventionResponseDtoData {
    constructor(
        id = "",
        name = "",
        inventor_ids = []
    ) {
        this._id = id;
        this._name = name;
        this._inventor_ids = inventor_ids;
    }

    getId() { return this._id; }
    getName() { return this._name; }
    getInventorIds() { return this._inventor_ids; }

    setId(id = "") { this._id = id; }
    setName(name = "") { this._name = name; }
    setInventorIds(inventor_ids = []) { this._inventor_id = inventor_ids; }
}
module.exports = inventionResponseDto;