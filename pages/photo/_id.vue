<template>
  <section class="container">
    <div class="ta-center mt-20">
      <a class="fw-700 fs-12" @click="$router.go(-1)">< Voltar</a>
    </div>

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

