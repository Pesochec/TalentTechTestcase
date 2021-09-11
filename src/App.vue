<template>
  <v-app>
    <TheToolBar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import TheToolBar from './components/TheToolBar'
import currentLang from './mixins/currentLang'

export default {
  name: 'App',
  components: { TheToolBar },
  mixins: [currentLang],
  created () {
    this.$vuetify.lang.current = this.$route.query?.lang || 'en'
  },
  computed: {
    langs () {
      return Object.keys(this.$vuetify.lang.locales)
    }
  },
  methods: {
    changeLang (lang) {
      this.$vuetify.lang.current = lang
      this.$router.push({
        query: {
          ...this.$route.query,
          lang
        }
      })
    }
  }
}
</script>
