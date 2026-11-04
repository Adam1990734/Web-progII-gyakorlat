class messageRequestDtoData {
    content;
    createdAt;
}

class messageRequestDto extends messageRequestDtoData {
    constructor(
        content = "",
        createdAt = Date.now()
    ) {
        super();
        this._content = content;
        this._createdAt = createdAt;
    }
    
    getContent() { return this.content; }
    getCreatedAt() { return this.createdAt; }

    setContent(content = "") { this.content = content; }
    setCreatedAt(createdAt = Date.now()) { this.createdAt = createdAt; }
}
module.exports = messageRequestDto;