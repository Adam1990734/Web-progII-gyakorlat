class inventionResponseDtoData {
    id;
    name;
    inventors;
}

class inventionResponseDto extends inventionResponseDtoData {
    constructor(
        id = "",
        name = "",
        inventors = []
    ) {
        super();
        this.id = id;
        this.name = name;
        this.inventors = inventors;
    }

    getId() { return this.id; }
    getName() { return this.name; }
    getInventors() { return this.inventors; }

    setId(id) { this.id = id; }
    setName(name) { this._name = name; }
    setInventors(inventors) { this.inventors = inventors; }
}
module.exports = inventionResponseDto;