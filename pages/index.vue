<template>
  <section class="container">
    <search-form />
    <gallery />
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
