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
        this.content = content;
        this.createdAt = createdAt;
    }
    
    getContent() { return this.content; }
    getCreatedAt() { return this.createdAt; }

    setContent(content) { this.content = content; }
    setCreatedAt(createdAt) { this.createdAt = createdAt; }
}
module.exports = messageRequestDto;