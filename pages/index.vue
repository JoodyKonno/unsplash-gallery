<template>
  <section>
    <div class="search-bar py-20">
      <div class="container">
        <search-form />
      </div>
    </div>

    <div class="mb-30 pt-20" :class="galleryClass">
      <div class="container">
        <gallery />
      </div>
    </div>
  </section>
</template>

<script>
import Gallery from '@/components/Gallery'
import SearchForm from '@/components/SearchForm'
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isLoading: 'photos/isLoading',
    }),
    galleryClass: function () {
      return ({
        'loading': this.isLoading,
      })
    },
  },

  components: {
    'gallery': Gallery,
    'search-form': SearchForm,
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    background-color: $primary-color;
    border: 1px solid #3d4f42;
  }
</style>

