class InventorRequestDtoData {
    name;
    bornAt;
    diedAt;
    inventions;
}

class InventorRequestDto extends InventorRequestDtoData {
    constructor(
        name = "",
        bornAt = 0,
        diedAt = 0,
        inventions = []
    ) {
        super();
        this.name = name;
        this.bornAt = bornAt;
        this.diedAt = diedAt;
        this.inventions = inventions;
    }

    getName() { return this.name; }
    getBornAt() { return this.bornAt; }
    getDiedAt() { return this.diedAt; }

    setName(name) { this.name = name; }
    setBornAt(bornAt) { this.bornAt = bornAt; }
    setDiedAt(diedAt) { this.diedAt = diedAt; }
    setInventors(inventors) { this.inventions = inventors; }
}
module.exports = InventorRequestDto;