<template>
  <v-card>
    <v-form
      ref="search-form"
      class="pa-3"
      @submit.prevent="$emit('submit', search)"
    >
      <v-row align-content="center">
        <v-col cols="10">
          <v-text-field
            v-model="search"
            :rules="searchRule"
            :label="$vuetify.lang.currentLocale('search.placeholder')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            type="submit"
          >
            {{ $vuetify.lang.currentLocale('search.button') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-virtual-scroll
      :items="searchHistory"
      height="300"
      item-height="64"
    >
      <template v-slot:default="{ item }">
        <v-list-item @click="search = item" :key="item">
          <v-list-item-action>
            {{ item }}
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import currentLang from '../mixins/currentLang'

export default {
  name: 'Search',
  props: {
    searchHistory: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      search: ''
    }
  },
  mixins: [currentLang],
  mounted () {
    if (this.$route.query?.city) {
      this.search = this.$route.query?.city
    }
  },
  watch: {
    currentLang () {
      this.$refs['search-form'].validate()
    }
  },
  computed: {
    searchRule () {
      return [(v) => !!v || this.$vuetify.lang.currentLocale('search.inputError')]
    }
  }
}
</script>

<style scoped>

</style>
