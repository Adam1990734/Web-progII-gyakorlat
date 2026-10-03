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
    get getId() { return this._id; }
    get getContent() { return this._content; }
    get getCreatedAt() { return this._createdAt; }
    get getUserId() { return this._userid; }
    get getUserName() { return this._username; }

    set setId(id = "") { this._id = id; }
    set setContent(content = "") { this._content = content; }
    set setCreatedAt(createdAt = Date.now()) { this._createdAt = createdAt; }
    set setUserId(userid = "") { this._userid = userid; }
    set setUserName(username = "") { this._username = username; }
}
module.exports = messageResponseDto;