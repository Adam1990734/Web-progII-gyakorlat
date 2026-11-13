class messageRequestDtoData {
    content;
}

class messageRequestDto extends messageRequestDtoData {
    constructor(
        content = ""
    ) {
        super();
        this.content = content;
    }
    
    getContent() { return this.content; }

    setContent(content) { this.content = content; }
}
module.exports = messageRequestDto;