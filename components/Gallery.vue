<template>
  <section>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    photos() {
      return this.$store.state.photos.items
    },
  }
}
</script>

