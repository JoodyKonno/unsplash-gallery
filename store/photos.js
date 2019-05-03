import LocalStorage from '../helpers/LocalStorage'
import SeachPhotosService from '../services/SearchPhotosService'
import PhotoModel from '../models/PhotoModel'

export const state = () => ({
  searchTerm: '',
  items: [],
  item: {},
  lastTerms: [],
  lastTermsLimit: 5,
})

export const getters = {
  lastTerms: state => state.lastTerms.slice().reverse(),
  item: state => state.item,
  author: state => {
    if (!state.item.author) {
      return ''
    }
    return state.item.author
  }
}

export const actions = {
  async searchPhotos({ state, commit }) {
    const response = await SeachPhotosService.query({
      q: state.searchTerm,
    })

    if (!state.lastTerms.includes(state.searchTerm)) {
      console.log(state.lastTerms.length >= state.lastTermsLimit)
      console.log(state.lastTerms.length)
      console.log(state.lastTermsLimit)
      if (state.lastTerms.length >= state.lastTermsLimit) {
        commit('removeOldestTerm')
      }
      commit('addTermToStack')
    } else {
      commit('putTermOnTop')
    }

    commit('setPhotos', response.results.map(result => new PhotoModel(result)))
  },

  getTermsFromStorage({ commit }) {
    const storageLastTerms = LocalStorage.getObject('lastTerms')
    if (storageLastTerms !== null) {
      commit('setLastTerms', storageLastTerms)
    }
  },

  loadPhoto({ state, commit }, { id }) {
    const selectedItems = state.items.filter(item => item.id === id)
    const cachedPhoto = LocalStorage.getObject('photoPost')

    if (selectedItems.length) {
      commit('setPhoto', selectedItems[0])
    } else if (cachedPhoto && cachedPhoto.id === id) {
      commit('setPhoto', cachedPhoto)
    }
  },
}

export const mutations = {
  setPhotos(state, payload) {
    state.items = payload
  },

  setPhoto(state, payload) {
    state.item = payload
    LocalStorage.setObject('photoPost', state.item)
  },

  loadPhoto(state, id) {
    state.item = state.items.filter(item => item.id === id)
  },

  addTermToStack(state) {
    state.lastTerms.push(state.searchTerm)
    LocalStorage.setObject('lastTerms', state.lastTerms)
  },

  removeOldestTerm(state) {
    state.lastTerms = [
      ...state.lastTerms.slice(1),
    ]
  },

  putTermOnTop(state) {
    state.lastTerms = [
      ...state.lastTerms.slice(0, state.lastTerms.indexOf(state.searchTerm)),
      ...state.lastTerms.slice(state.lastTerms.indexOf(state.searchTerm) + 1),
      state.searchTerm,
    ]
    LocalStorage.setObject('lastTerms', state.lastTerms)
  },

  setLastTerms(state, payload) {
    state.lastTerms = payload
  },

  setSearchTerm(state, val) {
    state.searchTerm = val
  },
}
