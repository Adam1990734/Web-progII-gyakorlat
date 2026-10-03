class messageDtoData {
    _content;
    _createdAt;
}

class messageDto extends messageDtoData {
    constructor(
        content = "",
        createdAt = Date.now()
    ) {
        this._content = content;
        this._createdAt = createdAt;
    }
    
    get getContent() { return this._content; }
    get getCreatedAt() { return this._createdAt; }

    set setContent(content = "") { this._content = content; }
    set setCreatedAt(createdAt = Date.now()) { this._createdAt = createdAt; }
}
module.exports = messageDto;