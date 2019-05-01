<template>
  <section>
    <img :src="photo.smallImageSrc" :alt="photo.altDescription">

    <div>
      <img :src="author.profileImageSmall" />
      <span>From:</span>
      <span>{{ author.firstName }} {{ author.lastName }}</span>
    </div>

    <div>
      <span>{{ photo.description }}</span>
    </div>

    <div>
      <span>{{ photo.likes }}</span>
      <span>likes</span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      photo: 'photos/item',
      author: 'photos/author',
    }),
  },
}
</script>

