<template>
  <section class="container">
    <div class="my-20">
      <search-form />
    </div>

    <div class="mb-30">
      <gallery />
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
