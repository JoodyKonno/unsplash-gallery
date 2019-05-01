<template>
  <section>
    <div class="columns">
      <div class="column card white" v-for="photo in photos" :key="photo.id">
        <div>
          <img :src="photo.author.profileImageSmall" />
          <span>From:</span>
          <span>{{ photo.author.firstName }} {{ photo.author.lastName }}</span>
        </div>
        <nuxt-link :to="`/photo/${photo.id}`">
          <img :src="photo.thumbImageSrc" :alt="photo.altDescription">
        </nuxt-link>
        <div>
          <span>{{ photo.description }}</span>
        </div>
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

