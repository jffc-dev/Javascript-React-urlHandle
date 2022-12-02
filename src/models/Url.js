export const Url = class {
    constructor(_id, index, url, titles, dateCreated, resets) {
        this._id = _id;
        this.index = index;
        this.url = url;
        this.titles = titles;
        this.dateCreated = dateCreated;
        this.resets = resets;
    }

    get currentUrl() {

        let maxReset = null;

        if(this.resets){
            let idReset = Math.max(...this.resets.map(reset => reset._id))
            maxReset = this.resets.find(reset => {
                return reset._id === idReset;
            });
        }

        return this.resets ? maxReset.url : this.url;

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