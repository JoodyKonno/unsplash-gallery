export default {
  set(key, val) {
    sessionStorage.setItem(key, val)
  },

  setObject(key, val) {
    this.set(key, JSON.stringify(val))
  },

  get(key) {
    return sessionStorage.getItem(key)
  },

  getObject(key) {
    return JSON.parse(this.get(key))
  }
}
