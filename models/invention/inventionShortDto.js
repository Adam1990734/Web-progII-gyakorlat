class inventionShortDtoData {
    id;
    name;
}

class inventionShortDto extends inventionShortDtoData {
    constructor(
        id = "",
        name = ""
    ) {
        super();
        this._id = id;
        this.name = name;
    }

    getId() { return this.id; }
    getName() { return this.name; }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
}
module.exports = inventionShortDto;