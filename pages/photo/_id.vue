<template>
  <section class="container">
    <photo-post />
  </section>
</template>

<script>
import PhotoPost from '@/components/PhotoPost'

export default {
  mounted() {
    this.$store.dispatch('photos/loadPhoto', this.$route.params)
  },

  components: {
    'photo-post': PhotoPost,
  },
}
</script>

