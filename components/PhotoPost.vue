<template>
  <section class="card white columns my-20 ta-left">
    <div class="photo">
      <div class="photo-image">
        <div class="photo-image-src" :style="photoBackgroundStyle(photo)"></div>
      </div>
    </div>

    <div class="photo-data my-10">
      <div class="photo-data-author pb-5">
        <img :src="author.profileImageSmall" />
        <span class="fs-11 fw-700">{{ author.username }}</span>
      </div>

      <div class="photo-data-description py-20 pr-10 ta-justify">
        <span class="fs-12">{{ photo.description }}</span>
      </div>

      <div class="photo-data-likes">
        <span class="fs-12">{{ photo.likes }}</span>
        <span class="fs-11">likes</span>
      </div>
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

  methods: {
    photoBackgroundStyle(photo) {
      return {
        'background': `url(${photo.regularImageSrc}) no-repeat center/contain`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .columns {
    @include gridColumns(3fr 1fr);

    @include sm {
      @include gridColumns(1fr);
    }
  }

  .photo {
    & .photo-image {
      height: 600px;
      background-color: $grey-333;

      @include sm {
        height: 200px;
      }

      & .photo-image-src {
        width: auto;
        height: inherit;
      }
    }
  }

  .photo-data {
    & .photo-data-author {
      border-bottom: 1px solid $grey-f3;
    }

    & .photo-data-description {
      color: $grey-666;
    }
  }
</style>
