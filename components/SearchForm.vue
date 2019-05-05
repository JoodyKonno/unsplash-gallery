<template>
  <section>
    <form>
      <input type="text" v-model.lazy="searchTerm" />
      <button type="submit" class="button primary" @click="search">Search</button>
    </form>
    <div class="search-form-terms">
      <span class="fs-14">Your last searches:</span>
      <span class="search-form-terms-word fs-12 fw-600" v-for="(term, i) in lastTerms" :key="i" @click="useTerm(term)">
        {{ term }}
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('photos/getTermsFromStorage')

    if (this.$route.query && this.$route.query.q) {
      this.searchTerm = this.$route.query.q
      this.doSearch()
    }
  },

  computed: {
    ...mapGetters({
      lastTerms: 'photos/lastTerms',
    }),

    searchTerm: {
      get () {
        return this.$store.state.photos.searchTerm
      },
      set (value) {
        this.$store.commit('photos/setSearchTerm', value)
      },
    },
  },
  methods: {
    search(e) {
      e.preventDefault()
      this.doSearch()
    },

    useTerm(term) {
      this.$store.commit('photos/setSearchTerm', term)
      this.doSearch()
    },

    doSearch() {
      this.$store.commit('photos/setCurrentPage', 1)
      this.$store.dispatch('photos/searchPhotos')

      this.$router.push({
        query: {
          q: this.searchTerm,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  input[type="text"] {
    height: 30px;
    font-size: 18px;
    border: none;
    color: $grey-333;
    background-color: $primary-input-color;

    @include sm {
      display: block;
      width: 90%;
      margin: 0 auto;
    }

    @include md {
      display: block;
      width: 90%;
      margin: 0 auto;
    }

    @include lg {
      width: 79%;
      display: inline-block;
    }
  }

  button[type="submit"] {
    height: 30px;
    margin-top: -2px;

    @include sm {
      display: block;
      width: 90%;
      margin: 5px auto;
    }

    @include md {
      display: block;
      width: 90%;
      margin: 5px auto;
    }

    @include lg {
      width: 19%;
      display: inline-block;
    }
  }

  .search-form-terms {
    color: $grey-f3;

    @include sm {
      max-width: 90%;
      margin: 0 auto;
    }

    @include md {
      max-width: 90%;
      margin: 0 auto;
    }

    @include lg {
      max-width: 100%;
    }

    & .search-form-terms-word {
      cursor: pointer;
    }
  }
</style>

