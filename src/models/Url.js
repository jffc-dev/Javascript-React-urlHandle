export const Url = class {
    constructor(_id, index, url, titles, dateCreated, resets) {
        this._id = _id;
        this.index = index;
        this.url = url;
        this.titles = titles;
        this.dateCreated = dateCreated;
        this.resets = resets;
    }
}

export const UrlRandom = class {
    constructor(_id, index, url, title, resets) {
        this._id = _id;
        this.index = index;
        this.url = url;
        this.title = title;
        this.resets = resets;
    }
}