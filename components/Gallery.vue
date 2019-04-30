<template>
  <section>
    <div v-for="photo in photos" :key="photo.id">
      <div>
        <img :src="photo.author.profileImageSmall" />
        <span>From:</span>
        <span>{{ photo.author.firstName }} {{ photo.author.lastName }}</span>
      </div>
      <img :src="photo.thumbImageSrc" :alt="photo.altDescription">
      <div>
        <span>{{ photo.description }}</span>
      </div>
    </div>
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

