class messageResponseDtoData {
    _id;
    _content;
    _createdAt;
    //User infók:
    _userid;
    _username;
}

class messageResponseDto extends messageResponseDtoData {
    constructor(
        id = "",
        content = "",
        createdAt = Date.now(),
        userid = "",
        username = ""
    ) {
        this._id = id;
        this._content = content;
        this._createdAt = createdAt;
        this._userid = userid;
        this._username = username;
    }
    getId() { return this._id; }
    getContent() { return this._content; }
    getCreatedAt() { return this._createdAt; }
    getUserId() { return this._userid; }
    getUserName() { return this._username; }

    setId(id = "") { this._id = id; }
    setContent(content = "") { this._content = content; }
    setCreatedAt(createdAt = Date.now()) { this._createdAt = createdAt; }
    setUserId(userid = "") { this._userid = userid; }
    setUserName(username = "") { this._username = username; }
}
module.exports = messageResponseDto;