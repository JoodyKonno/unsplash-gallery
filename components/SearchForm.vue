<template>
  <section>
    <form>
      <input type="text" v-model.lazy="searchTerm" />
      <button type="submit" class="button blue" @click="search">Search</button>
    </form>
    <div class="search-form-terms">
      <span class="fs-11 fw-600" v-for="(term, i) in lastTerms" :key="i" @click="useTerm(term)">
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
      this.$store.dispatch('photos/searchPhotos')
    },

    useTerm(term) {
      this.$store.commit('photos/setSearchTerm', term)
    }
  },
}
</script>

<style lang="scss" scoped>
  input[type="text"] {
    height: 30px;
    font-size: 18px;
    border: none;
    color: $grey-333;

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
  }
</style>

