class messageDtoData {
    _content;
    _createdAt;
}

class messageDto extends messageDtoData {
    constructor(
        content = "",
        createdAt = Date.now()
    ) {
        super();
        this._content = content;
        this._createdAt = createdAt;
    }
    
    getContent() { return this._content; }
    getCreatedAt() { return this._createdAt; }

    setContent(content = "") { this._content = content; }
    setCreatedAt(createdAt = Date.now()) { this._createdAt = createdAt; }
}
module.exports = messageDto;