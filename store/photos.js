import LocalStorage from '../helpers/LocalStorage'
import SeachPhotosService from '../services/SearchPhotosService'
import PhotoModel from '../models/PhotoModel'

export const state = () => ({
  searchTerm: '',
  items: [],
  item: {},
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  lastTerms: [],
  lastTermsLimit: 5,
})

export const getters = {
  lastTerms: state => state.lastTerms.slice().reverse(),
  items: state => state.items,
  item: state => state.item,
  totalItems: state => state.totalItems,
  totalPages: state => state.totalPages,
  currentPage: state => state.currentPage,
  isFirstPage: state => state.currentPage === 1,
  isLastPage: state => state.currentPage === state.totalPages,
  author: state => {
    if (!state.item.author) {
      return ''
    }
    return state.item.author
  }
}

export const actions = {
  async searchPhotos({ state, commit }) {
    const { results, total, total_pages } = await SeachPhotosService.query({
      q: state.searchTerm,
      page: state.currentPage,
    })

    if (!state.lastTerms.includes(state.searchTerm)) {
      if (state.lastTerms.length >= state.lastTermsLimit) {
        commit('removeOldestTerm')
      }
      commit('addTermToStack')
    } else {
      commit('putTermOnTop')
    }

    commit('setPhotos', results.map(result => new PhotoModel(result)))
    commit('setTotalItems', total)
    commit('setTotalPages', total_pages)
  },

  goPreviousPage({ state, commit, dispatch }) {
    commit('setCurrentPage', state.currentPage - 1)
    dispatch('searchPhotos')
  },

  goNextPage({ state, commit, dispatch }) {
    commit('setCurrentPage', state.currentPage + 1)
    dispatch('searchPhotos')
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

  setTotalItems(state, val) {
    state.totalItems = val
  },

  setTotalPages(state, val) {
    state.totalPages = val
  },

  setCurrentPage(state, val) {
    state.currentPage = val
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
