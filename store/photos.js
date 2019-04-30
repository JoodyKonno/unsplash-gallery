import LocalStorage from '../helpers/LocalStorage'
import SeachPhotosService from '../services/SearchPhotosService'
import PhotoModel from '../models/PhotoModel'

export const state = () => ({
  searchTerm: '',
  items: [],
  lastTerms: [],
})

export const getters = {
  lastTerms: state => state.lastTerms.slice().reverse()
}

export const actions = {
  async searchPhotos({ state, commit }) {
    const response = await SeachPhotosService.query({
      q: state.searchTerm,
    })

    commit('addTermToStack')
    commit('setPhotos', response.results.map(result => new PhotoModel(result)))
  },

  getTermsFromStorage({ commit }) {
    const storageLastTerms = LocalStorage.getObject('lastTerms')
    if (storageLastTerms !== undefined) {
      commit('setLastTerms', storageLastTerms)
    }
  },
}

export const mutations = {
  setPhotos(state, payload) {
    state.items = payload
  },

  addTermToStack(state) {
    state.lastTerms.push(state.searchTerm)
    LocalStorage.setObject('lastTerms', state.lastTerms)
  },

  setLastTerms(state, payload) {
    state.lastTerms = payload
  },

  setSearchTerm(state, val) {
    state.searchTerm = val
  },
}
