<template>
  <section>
    <div class="search-bar mb-20 py-20">
      <div class="container">
        <search-form />
      </div>
    </div>

    <div class="mb-30">
      <div class="container">
        <gallery />
      </div>
    </div>
  </section>
</template>

<script>
import Gallery from '@/components/Gallery'
import SearchForm from '@/components/SearchForm'

export default {
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

