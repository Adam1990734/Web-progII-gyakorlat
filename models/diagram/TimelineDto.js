class TimeLineDtoData {
    name;
    bornAt;
    diedAt;
}

class TimeLineDto extends TimeLineDtoData {
    constructor(
        name = "",
        bornAt = 0,
        diedAt = 0
    ) {
        super();
        this.name = name;
        this.bornAt = bornAt;
        this.diedAt = diedAt;
    }

    getName() { return this.name; }
    getBornAt() { return this.bornAt; }
    getDiedAt() { return this.diedAt; }

    setName(name) { this.name = name; }
    setBornAt(bornAt) { this.bornAt = bornAt; }
    setDiedAt(diedAt) { this.diedAt = diedAt; }
}

module.exports = TimeLineDto;