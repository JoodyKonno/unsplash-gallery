<template>
  <section class="gallery">
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

    <div class="gallery-no-photos ta-center" v-show="!photos.length && !isPristineSearch">
      <span class="fs-12">
        Your search for
        <span class="fw-700">{{ searchTerm }} </span>
        returned empty matches
      </span>
    </div>

    <div class="columns has-3" v-show="photos.length">
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
            <span class="fs-12" v-show="photo.description">
              {{ photo.description }}
            </span>

            <span class="fs-12" v-show="!photo.description && photo.altDescription">
              {{ photo.altDescription }}
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
      searchTerm: 'photos/searchTerm',
      photos: 'photos/items',
      totalItems: 'photos/totalItems',
      totalPages: 'photos/totalPages',
      currentPage: 'photos/currentPage',
      isFirstPage: 'photos/isFirstPage',
      isLastPage: 'photos/isLastPage',
      isPristineSearch: 'photos/isPristineSearch',
    }),
  },

  methods: {
    photoBackgroundStyle(photo) {
      return {
        'background': `url(${photo.smallImageSrc}) no-repeat center`
      }
    },

    scrollToTop() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    },

    previous() {
      this.$store.dispatch('photos/goPreviousPage')
      this.$nextTick(() => {
        this.scrollToTop();
      })
    },

    next() {
      this.$store.dispatch('photos/goNextPage')
      this.$nextTick(() => {
        this.scrollToTop();
      })
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


