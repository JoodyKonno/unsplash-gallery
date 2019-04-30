<template>
  <section>
    <form>
      <input type="text" v-model.lazy="searchTerm" />
      <input type="submit" @click="search">
    </form>
  </section>
</template>

<script>
export default {
  computed: {
    searchTerm: {
      get () {
        return this.$store.state.photos.searchTerm
      },
      set (value) {
        this.$store.commit('photos/updateSearchTerm', value)
      },
    },
  },
  methods: {
    search(e) {
      e.preventDefault()
      this.$store.dispatch('photos/searchPhotos')
    },
  },
}
</script>
