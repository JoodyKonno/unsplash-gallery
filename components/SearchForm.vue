<template>
  <section>
    <form>
      <input type="text" v-model.lazy="searchTerm" />
      <input type="submit" @click="search">
    </form>
    <div>
      <span v-for="(term, i) in lastTerms" :key="i" @click="useTerm(term)">
        {{ term }}
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('photos/getTermsFromStorage')
  },

  computed: {
    ...mapGetters({
      lastTerms: 'photos/lastTerms',
    }),

    searchTerm: {
      get () {
        return this.$store.state.photos.searchTerm
      },
      set (value) {
        this.$store.commit('photos/setSearchTerm', value)
      },
    },
  },
  methods: {
    search(e) {
      e.preventDefault()
      this.$store.dispatch('photos/searchPhotos')
    },

    useTerm(term) {
      this.$store.commit('photos/setSearchTerm', term)
    }
  },
}
</script>
