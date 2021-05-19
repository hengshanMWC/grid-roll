export default class Params {
  constructor (indexs) {
    this.indexs = this.setIndex(indexs)
    this.index = 0
  }
  // indexs的下标值
  get indexValue () {
    if (isNaN(Number(this.index))) {
      return undefined
    } else {
      return this.indexs[this.index]
    }
  }
  setIndex (indexs) {
    if (Array.isArray(indexs)) {
      return JSON.parse(JSON.stringify(indexs))
    } else {
      return [ indexs ]
    }
  }
  next () {
    return this.indexs.length > ++this.index
  }
}
