import SeachPhotosService from '../services/SearchPhotosService'
import PhotoModel from '../models/PhotoModel'

export const state = () => ({
  searchTerm: 'lakes',
  items: [],
})

export const actions = {
  async searchPhotos({ state, commit }) {
    const response = await SeachPhotosService.query({
      q: state.searchTerm,
    })

    commit('setPhotos', response.results.map(result => new PhotoModel(result)))
  }
}

export const mutations = {
  setPhotos(state, payload) {
    state.items = payload
  },

  updateSearchTerm(state, val) {
    state.searchTerm = val
  },
}
