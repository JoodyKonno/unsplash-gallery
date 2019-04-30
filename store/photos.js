import SeachPhotosService from '../services/SearchPhotosService'

export const state = () => ({
  searchTerm: 'lakes',
  items: [],
})

export const getters = () => ({
  items: ({ state }) => state.items,
})

export const actions = {
  async searchPhotos({ state, commit }) {
    const response = await SeachPhotosService.query({
      q: state.searchTerm,
    })

    commit('setPhotos', response)
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
