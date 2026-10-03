class messageDtoData {
    _id;
    _content;
    _createdAt;
}

class messageDto extends messageDtoData {
    constructor(
        id = "",
        content = "",
        createdAt = ""
    ) {
        this._id = id;
        this._content = content;
        this._createdAt = createdAt;
    }
    get getId() { return this._id; }
    get getContent() { return this._content; }
    get getCreatedAt() { return this._createdAt; }

    set setId(id = "") { this._id = id; }
    set setContent(content = "") { this._content = content; }
    set setCreatedAt(createdAt = "") { this._createdAt = createdAt; }
}
module.exports = messageDto;