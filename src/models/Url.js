export const Url = class {
  constructor(_id, index, url, titles, dateCreated, resets) {
    this._id = _id
    this.index = index
    this.url = url
    this.titles = titles
    this.dateCreated = dateCreated
    this.resets = resets
  }

  get currentUrl() {
    let maxReset = null

    if (this.resets) {
      const idReset = Math.max(...this.resets.map((reset) => reset._id))
      maxReset = this.resets.find((reset) => {
        return reset._id === idReset
      })
    }

    return this.resets ? maxReset.url : this.url
  }

  get currentTitle() {
    let maxTitle = null
    if (this.titles?.length > 0) {
      const idReset = Math.max(...this.titles.map((reset) => reset._id))
      maxTitle = this.titles.find((reset) => {
        return reset._id === idReset
      })
    }

    return this.titles?.length > 0 ? maxTitle.title : null
  }

  get currentTitleOrUrl() {
    let maxReset = null

    if (this.resets) {
      const idReset = Math.max(...this.resets.map((reset) => reset._id))
      maxReset = this.resets.find((reset) => {
        return reset._id === idReset
      })
    }

    const url = this.resets ? maxReset.url : this.url

    let maxTitle = null
    if (this.titles) {
      const idReset = Math.max(...this.titles.map((reset) => reset._id))
      maxTitle = this.titles.find((reset) => {
        return reset._id === idReset
      })
    }

    const title = this.titles && maxTitle.title

    return title || url
  }
}
