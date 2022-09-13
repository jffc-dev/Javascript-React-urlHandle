export const Url = class {
    constructor(_id, index, url, title, dateCreated) {
        this._id = _id;
        this.index = index;
        this.url = url;
        this.title = title;
        this.dateCreated = dateCreated;
    }
}

export const UrlRandom = class {
    constructor(_id, index, url, title) {
        this._id = _id;
        this.index = index;
        this.url = url;
        this.title = title;
    }
}