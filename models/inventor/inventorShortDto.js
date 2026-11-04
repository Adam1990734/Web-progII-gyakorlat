class inventorShortDtoData {
    id;
    name;
}

class inventorShortDto extends inventorShortDtoData {
    constructor(
        id = "",
        name = ""
    ) {
        super();
        this.id = id;
        this.name = name;
    }

    getId() { return this.id; }
    getName() { return this.name; }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
}
module.exports = inventorShortDto;