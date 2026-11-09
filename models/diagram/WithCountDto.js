class withCountDtoData {
    name;
    count;
}

class withCountDto extends withCountDtoData {
    constructor(
        name = "",
        count = 0
    ) {
        super();
        this.name = name;
        this.count = count;
    }

    getName() { return this.name; }
    getCount() { return this.count; }

    setName(name) { this.name = name; }
    setCount(count) { this.count = count; }
}

module.exports = withCountDto;