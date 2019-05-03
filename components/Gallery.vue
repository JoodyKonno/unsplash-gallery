<template>
  <section>
    <div class="gallery-meta my-10" v-show="photos.length">
      <span class="fs-12">
        Page
        <strong>{{ currentPage }}</strong>
        of
        <strong>{{ totalPages }}</strong>
        , of a total
        <strong>{{ totalItems }}</strong>
        images
      </span>
    </div>

    <div class="columns has-3">
      <div class="photo card white" v-for="photo in photos" :key="photo.id">
        <nuxt-link :to="`/photo/${photo.id}`">
          <div class="photo-image">
            <div class="photo-image-src" :style="photoBackgroundStyle(photo)"></div>
          </div>
        </nuxt-link>

        <div class="ma-10">
          <div class="photo-author ta-left pb-5 mb-15">
            <img :src="photo.author.profileImageSmall" />
            <span class="photo-author-username fs-11 fw-700">{{ photo.author.username }}</span>
          </div>

          <div class="photo-description ta-justify">
            <span class="fs-12">
              {{ photo.description }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="gallery-pagination ta-center fw-700" v-show="photos.length">
      <a href="javascript:void(0)"
        class="gallery-pagination-navigation"
        v-show="!isFirstPage"
        @click="previous">
        <<< Previous
      </a>

      <a href="javascript:void(0)"
        class="gallery-pagination-navigation"
        v-show="!isLastPage"
        @click="next">
        Next >>>
      </a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      photos: 'photos/items',
      totalItems: 'photos/totalItems',
      totalPages: 'photos/totalPages',
      currentPage: 'photos/currentPage',
      isFirstPage: 'photos/isFirstPage',
      isLastPage: 'photos/isLastPage',
    }),
  },

  methods: {
    photoBackgroundStyle(photo) {
      return {
        'background': `url(${photo.smallImageSrc}) no-repeat center`
      }
    },

    previous() {
      this.$store.dispatch('photos/goPreviousPage')
    },

    next() {
      this.$store.dispatch('photos/goNextPage')
    },
  }
}
</script>

<style lang="scss" scoped>
  .photo {
    & .photo-image {
      height: 350px;
      background-color: $grey-333;

      & .photo-image-src {
        width: auto;
        height: inherit;
      }
    }

    & .photo-author {
      border-bottom: 1px solid $grey-f3;

      & img {
        border-radius: 50%;
      }

      & .photo-author-username {
        color: $grey-666;
        text-decoration: underline;
      }
    }

    & .photo-description {
      height: 100px;
      color: $grey-666;
      overflow-y: auto;
    }
  }

  .gallery-pagination {
    & .gallery-pagination-navigation {
      display: inline-block;
      padding: 10px;
      text-decoration: underline;
    }
  }
</style>


