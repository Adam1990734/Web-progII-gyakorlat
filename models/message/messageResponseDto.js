class messageResponseDtoData {
    id;
    content;
    createdAt;
    //User infók:
    userid;
    username;
}

class messageResponseDto extends messageResponseDtoData {
    constructor(
        id = "",
        content = "",
        createdAt = Date.now(),
        userid = "",
        username = ""
    ) {
        super();
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.userid = userid;
        this.username = username;
    }
    getId() { return this.id; }
    getContent() { return this.content; }
    getCreatedAt() { return this.createdAt; }
    getUserId() { return this.userid; }
    getUserName() { return this.username; }

    setId(id = "") { this.id = id; }
    setContent(content = "") { this.content = content; }
    setCreatedAt(createdAt = Date.now()) { this.createdAt = createdAt; }
    setUserId(userid = "") { this.userid = userid; }
    setUserName(username = "") { this.username = username; }
}
module.exports = messageResponseDto;