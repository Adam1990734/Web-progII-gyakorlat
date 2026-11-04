class InventorDtoResponseData {
    id;
    name;
    bornAt;
    diedAt;
    inventions;
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
        this.id = id;
        this.name = name;
        this.bornAt = bornAt;
        this.diedAt = diedAt;
        this.inventions = inventions;
    }

    getId() { return this.id; }
    getName() { return this.name; }
    getBornAt() { return this.bornAt; }
    getDiedAt() { return this.diedAt; }
    getInventions() { return this.inventions; }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
    setBornAt(bornAt) { this.bornAt = bornAt; }
    setDiedAt(diedAt) { this.diedAt = diedAt; }
    setInventions(inventions) { this.inventions = inventions; }
}
module.exports = InventorResponseDto;