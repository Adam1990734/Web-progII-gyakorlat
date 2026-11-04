class inventionRequestDtoData {
    name;
}

class inventionRequestDto extends inventionRequestDtoData {
    constructor(
        name = ""
    ) {
        super();
        this.name = name;
    }

    getName() { return this.name; }

    setName(name) { this.name = name; }
}
module.exports = inventionRequestDto;